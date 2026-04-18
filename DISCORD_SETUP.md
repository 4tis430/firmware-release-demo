# 📢 Discord Notifications Setup Guide

## Overview

This guide explains how to set up Discord notifications for your CI/CD pipeline. The pipeline will send real-time updates to your Discord server whenever a workflow runs, including success, failure, and approval status.

---

## 🎯 What Gets Notified

The pipeline sends notifications for:
- ✅ **Successful releases** - When all tests pass and release is published
- ❌ **Failed security scans** - When vulnerabilities are detected
- ❌ **Failed QA tests** - When any board fails validation
- ❌ **Failed builds** - When release creation fails
- ⏭️ **Awaiting approval** - When manual approval is required for Production environment
- ⚠️ **Unknown status** - For unexpected pipeline states

Each notification includes:
- Pipeline status with emoji indicators
- Commit message and author
- Branch name
- Direct link to the workflow run

---

## 🔧 Setup Instructions

### Step 1: Create a Discord Webhook

1. **Open Discord** and navigate to your server
2. **Go to Server Settings** → **Integrations** → **Webhooks**
3. **Click "New Webhook"** or "Create Webhook"
4. **Configure the webhook:**
   - **Name:** CI/CD Pipeline Bot (or your preferred name)
   - **Channel:** Select the channel where notifications should appear (e.g., #deployments, #ci-cd, #releases)
   - **Avatar:** (Optional) Upload a custom avatar
5. **Copy the Webhook URL** - It looks like:
   ```
   https://discord.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz
   ```
6. **Click "Save"**

### Step 2: Add Webhook to GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to:** Settings → Secrets and variables → Actions
3. **Click "New repository secret"**
4. **Configure the secret:**
   - **Name:** `DISCORD_WEBHOOK`
   - **Value:** Paste the webhook URL you copied from Discord
5. **Click "Add secret"**

### Step 3: Test the Notification

1. **Make a commit** to the main branch:
   ```bash
   git add .
   git commit -m "test(ci): verify Discord notifications"
   git push origin main
   ```

2. **Check Discord** - You should see a notification appear in your configured channel

---

## 📊 Notification Examples

### ✅ Success Notification
```
Enterprise Firmware Pipeline

Status: ✅ SUCCESS - Released
Commit: feat(firmware): add Rev-D board support
Author: John Doe
Branch: main

[View Workflow Run →]
```
**Color:** Green (3066993)

### ❌ Failure Notification
```
Enterprise Firmware Pipeline

Status: ❌ FAILED - QA Testing
Commit: fix(firmware): resolve boot timeout
Author: Jane Smith
Branch: main

[View Workflow Run →]
```
**Color:** Red (15158332)

### ⏭️ Awaiting Approval Notification
```
Enterprise Firmware Pipeline

Status: ⏭️ SKIPPED - Awaiting Approval
Commit: feat(firmware): major update for production
Author: Release Manager
Branch: main

[View Workflow Run →]
```
**Color:** Yellow (16776960)

---

## 🎨 Customization Options

### Change Notification Colors

Edit the color codes in `.github/workflows/release.yml`:

```yaml
# Red for failures
echo "color=15158332" >> $GITHUB_OUTPUT

# Green for success
echo "color=3066993" >> $GITHUB_OUTPUT

# Yellow for warnings/skipped
echo "color=16776960" >> $GITHUB_OUTPUT

# Blue (alternative)
echo "color=3447003" >> $GITHUB_OUTPUT

# Orange (alternative)
echo "color=15105570" >> $GITHUB_OUTPUT
```

### Change Bot Name and Avatar

Edit the Discord notification step:

```yaml
- name: 📢 Send Discord Notification
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    username: "Your Custom Bot Name"
    avatar_url: "https://your-custom-avatar-url.com/image.png"
```

### Add More Details to Notifications

Enhance the description field:

```yaml
description: |
  **Status:** ${{ steps.status.outputs.status }}
  **Commit:** `${{ github.event.head_commit.message }}`
  **Author:** ${{ github.event.head_commit.author.name }}
  **Branch:** ${{ github.ref_name }}
  **Repository:** ${{ github.repository }}
  **Workflow:** ${{ github.workflow }}
  **Run Number:** #${{ github.run_number }}
  
  [View Workflow Run →](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }})
```

---

## 🔒 Security Best Practices

### 1. **Never Commit Webhook URLs**
- ❌ **Bad:** Hardcoding webhook URL in workflow file
- ✅ **Good:** Using GitHub Secrets (`${{ secrets.DISCORD_WEBHOOK }}`)

### 2. **Limit Webhook Permissions**
- Configure webhook to only post in specific channels
- Don't give webhook admin permissions

### 3. **Rotate Webhooks Regularly**
- If webhook URL is compromised, delete and create a new one
- Update GitHub secret with new URL

### 4. **Monitor Webhook Usage**
- Check Discord audit logs for unexpected webhook activity
- Set up alerts for unusual notification patterns

---

## 🧪 Testing Different Scenarios

### Test Success Notification
```bash
# Make a simple change that will pass all tests
echo "# Test" >> README.md
git add README.md
git commit -m "test(ci): verify success notification"
git push origin main
```

### Test Failure Notification
```bash
# Temporarily break a test to trigger failure
# (Remember to fix it afterwards!)
```

### Test Approval Notification
```bash
# Push to main - pipeline will pause at Production environment
git commit -m "feat(firmware): major production update"
git push origin main
# Check Discord for "Awaiting Approval" notification
```

---

## 🛠️ Troubleshooting

### Notifications Not Appearing

1. **Check webhook URL is correct:**
   - Go to GitHub Settings → Secrets
   - Verify `DISCORD_WEBHOOK` secret exists
   - Webhook URL should start with `https://discord.com/api/webhooks/`

2. **Check Discord channel permissions:**
   - Ensure webhook has permission to post in the channel
   - Check channel isn't muted or hidden

3. **Check workflow logs:**
   - Go to Actions tab in GitHub
   - Click on the workflow run
   - Check the "Send Discord Notification" step for errors

4. **Verify webhook is active:**
   - Go to Discord Server Settings → Integrations → Webhooks
   - Ensure webhook hasn't been deleted

### Notifications Showing Wrong Information

1. **Check workflow file syntax:**
   - Ensure all `${{ }}` expressions are correct
   - Verify indentation in YAML file

2. **Check GitHub context variables:**
   - Some variables may be empty for certain trigger types
   - Test with different commit messages

---

## 📖 Additional Resources

- **Discord Webhooks Documentation:** https://discord.com/developers/docs/resources/webhook
- **GitHub Actions Context:** https://docs.github.com/en/actions/learn-github-actions/contexts
- **sarisia/actions-status-discord:** https://github.com/sarisia/actions-status-discord

---

## 💡 Pro Tips

1. **Create separate channels** for different notification types (e.g., #releases, #failures)
2. **Use role mentions** for critical failures: `<@&ROLE_ID>` in description
3. **Add custom fields** for more detailed information
4. **Set up multiple webhooks** for different environments (dev, staging, prod)
5. **Use Discord threads** to organize notifications by release version

---

**Your pipeline is now configured to send real-time notifications to Discord! 🚀**
