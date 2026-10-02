const CONTACT_SUBJECTS = new Set([
  '', 'Bilservice & underhåll', 'Däckservice', 'AC-service',
  'Felsökning & diagnostik', 'Reparationer & större arbeten',
  'Bärgning', 'Övrigt',
]);
const BOOKING_STATUSES = new Set(['pending', 'confirmed', 'completed', 'cancelled', 'erased']);
const EMAIL = /^[^\s@\r\n<>]+@[^\s@\r\n<>]+\.[^\s@\r\n<>]+$/;

function text(value, max, required = false) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  if (normalized.length > max || (required && !normalized)) return null;
  return normalized;
}

function validEmail(value) {
  return typeof value === 'string' && value.length <= 254 && EMAIL.test(value);
}

function validateContact(input) {
  const fields = {};
  const value = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { fields: { body: 'Invalid JSON object' } };
  }
  for (const [key, max, required] of [
    ['name', 120, true], ['email', 254, true], ['phone', 40, false],
    ['subject', 80, false], ['message', 4000, true],
  ]) {
    const parsed = text(input[key] === undefined && !required ? '' : input[key], max, required);
    if (parsed === null) fields[key] = `Must be ${required ? 'non-empty ' : ''}text up to ${max} characters`;
    else value[key] = parsed;
  }
  if (!fields.email && !validEmail(value.email)) fields.email = 'Enter a valid email address';
  if (!fields.subject && !CONTACT_SUBJECTS.has(value.subject)) fields.subject = 'Choose a listed subject';
  if (Object.keys(fields).length) return { fields };
  return { value };
}

function validCalendarDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
}

function validateBooking(input) {
  const fields = {};
  const value = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { fields: { body: 'Invalid JSON object' } };
  }
  for (const [key, max] of [
    ['customerName', 120], ['customerEmail', 254], ['customerPhone', 40],
  ]) {
    const parsed = text(input[key], max, true);
    if (parsed === null) fields[key] = `Must be non-empty text up to ${max} characters`;
    else value[key] = parsed;
  }
  if (!fields.customerEmail && !validEmail(value.customerEmail)) fields.customerEmail = 'Enter a valid email address';
  if (!Number.isSafeInteger(input.serviceId) || input.serviceId < 1) fields.serviceId = 'Choose a valid service';
  else value.serviceId = input.serviceId;
  if (!validCalendarDate(input.date)) fields.date = 'Use a real date in yyyy-MM-dd format';
  else value.date = input.date;
  if (typeof input.time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time)) fields.time = 'Use HH:mm';
  else value.time = input.time;
  if (input.comment_customer === undefined || input.comment_customer === null) value.comment_customer = null;
  else {
    const comment = text(input.comment_customer, 255);
    if (comment === null) fields.comment_customer = 'Use up to 255 characters';
    else value.comment_customer = comment || null;
  }
  if (Object.keys(fields).length) return { fields };
  return { value };
}

module.exports = { validateContact, validateBooking, BOOKING_STATUSES };
