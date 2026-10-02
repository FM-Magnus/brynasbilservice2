import axiosInstance from './axiosConfig'

export type ContactMessage = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

/** Inquiry subjects offered by both contact forms and accepted by the API. */
export const contactSubjects: readonly string[] = [
  'Bilservice & underhåll',
  'Däckservice',
  'AC-service',
  'Felsökning & diagnostik',
  'Reparationer & större arbeten',
  'Bärgning',
  'Övrigt',
]

/** A successful response means the configured mail server accepted the message. */
export async function submitContact(message: ContactMessage, signal?: AbortSignal): Promise<void> {
  await axiosInstance.post('/api/contact', message, { signal })
}
