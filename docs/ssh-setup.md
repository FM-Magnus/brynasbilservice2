# SSH Key Setup for fenrirm@194.14.207.224

This document outlines the steps to set up and configure the SSH key for the `fenrirm` user on the server `194.14.207.224`.

## Step 1: Generate SSH Key (Local Machine)

1. Open a terminal on your local machine.
2. Generate a new SSH key pair named `fenrirm`:

  ```bash
  ssh-keygen -t ed25519 -f ~/.ssh/fenrirm -C "fenrirm@194.14.207.224"
  ```

- Press `Enter` to skip the passphrase (or set one if desired).

## Step 2: Add Public Key to the Server

1. Use `ssh-copy-id` to copy the public key to the server:

  ```bash
  ssh-copy-id -i ~/.ssh/fenrirm.pub fenrirm@194.14.207.224
  ```

- This will add the public key to the `~/.ssh/authorized_keys` file on the server.

1. If `ssh-copy-id` is not available, manually copy the key:

- Display the public key on your local machine:

  ```bash
  cat ~/.ssh/fenrirm.pub
  ```

  - On the server, append the key to the `~/.ssh/authorized_keys` file:

  ```bash
  echo "<PASTE_PUBLIC_KEY_HERE>" >> ~/.ssh/authorized_keys
  chmod 600 ~/.ssh/authorized_keys
  ```

## Step 3: Test the SSH Key

1. Test the connection from your local machine:

   ```bash
   ssh -i ~/.ssh/fenrirm fenrirm@194.14.207.224
   ```

   - If it works, you're all set.
   - If it doesn't work, proceed to Step 4.

## Step 4: Debug SSH Connection Issues

1. Run the SSH command with verbose output to debug:

   ```bash
   ssh -i ~/.ssh/fenrirm -v fenrirm@194.14.207.224
   ```

   - Look for errors like "Permission denied" or "Key not accepted."

2. Common fixes:

   - **Key permissions**: Ensure the private key has `600` permissions:

     ```bash
     chmod 600 ~/.ssh/fenrirm
     ```

   - **Server permissions**: Ensure the `~/.ssh` directory and `~/.ssh/authorized_keys` file on the server have the correct permissions:

     ```bash
     chmod 700 ~/.ssh
     chmod 600 ~/.ssh/authorized_keys
     ```

## Step 5: Update SSH Config for Convenience

1. Edit or create the SSH config file on your local machine:

   ```bash
   nano ~/.ssh/config
   ```

2. Add the following entry:

   ```bash
   Host fenrirm-server
       HostName 194.14.207.224
       User fenrirm
       IdentityFile ~/.ssh/fenrirm
   ```

3. Save and exit.

4. Test the connection using the alias:

   ```bash
   ssh fenrirm-server
   ```

## Step 6: Disable Password Authentication (Optional)

1. On the server, edit the SSH configuration file:

   ```bash
   sudo nano /etc/ssh/sshd_config
   ```

2. Update the following lines:

   ```bash
   PasswordAuthentication no
   PubkeyAuthentication yes
   ```

3. Restart the SSH service:

   ```bash
   sudo systemctl restart sshd
   ```

This setup ensures secure and convenient SSH access to the server for the `fenrirm` user.
