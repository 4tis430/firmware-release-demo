# 📝 Commit Message Conventions

## Overview

This project uses **Conventional Commits** to enable automatic release notes generation and categorization by GitHub. Following these conventions ensures your commits are properly organized and documented in release notes.

---

## 🎯 Conventional Commits Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Example:
```
feat(firmware): add support for Rev-D board

Implemented hardware initialization for the new Rev-D board revision.
This includes updated driver loading and boot sequence validation.

Closes #123
```

---

## 📋 Commit Types

### **Primary Types** (Most Common)

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature or enhancement | `feat: add Rev-D board support` |
| `fix` | Bug fix | `fix: resolve boot timeout on Rev-B` |
| `docs` | Documentation changes | `docs: update README with new usage examples` |
| `test` | Adding or updating tests | `test: add validation tests for Rev-C` |
| `refactor` | Code refactoring (no functional change) | `refactor: simplify firmware initialization logic` |
| `perf` | Performance improvements | `perf: optimize driver loading time` |
| `chore` | Maintenance tasks | `chore: update dependencies` |

### **Additional Types**

| Type | Description | Example |
|------|-------------|---------|
| `build` | Build system or dependencies | `build: upgrade Node.js to v20` |
| `ci` | CI/CD pipeline changes | `ci: add security scanning job` |
| `style` | Code style/formatting (no logic change) | `style: format code with prettier` |
| `revert` | Revert a previous commit | `revert: revert "feat: add Rev-D support"` |

---

## 🏷️ GitHub Label Mapping

GitHub automatically categorizes commits in release notes based on type:

| Commit Type | GitHub Label | Release Notes Section |
|-------------|--------------|----------------------|
| `feat` | `enhancement` | ✨ **New Features** |
| `fix` | `bug` | 🐛 **Bug Fixes** |
| `docs` | `documentation` | 📚 **Documentation** |
| `perf` | `performance` | ⚡ **Performance** |
| `refactor` | `refactoring` | ♻️ **Refactoring** |
| `test` | `testing` | 🧪 **Testing** |
| `ci` | `ci/cd` | 🔧 **CI/CD** |
| `chore` | `maintenance` | 🔨 **Maintenance** |

---

## 🚀 Best Practices

### 1. **Use Descriptive Commit Messages**
```bash
# ❌ Bad
git commit -m "fix bug"

# ✅ Good
git commit -m "fix(firmware): resolve memory leak in driver initialization"
```

### 2. **Add Scope for Context** (Optional but Recommended)
```bash
feat(firmware): add Rev-D board support
fix(pipeline): correct matrix strategy syntax
docs(readme): add installation instructions
test(qa): add Rev-C validation tests
```

### 3. **Use Breaking Changes Notation**
For breaking changes, add `!` after the type or add `BREAKING CHANGE:` in the footer:

```bash
# Option 1: Using !
feat(firmware)!: change board argument format

# Option 2: Using footer
feat(firmware): change board argument format

BREAKING CHANGE: Board arguments now require uppercase format (REV-A instead of Rev-A)
```

### 4. **Reference Issues and PRs**
```bash
fix(firmware): resolve boot timeout on Rev-B

Fixes #42
Closes #45
Related to #50
```

### 5. **Multi-line Commits for Complex Changes**
```bash
git commit -m "feat(pipeline): add security scanning job" -m "
Implemented automated security vulnerability scanning using simulated tools.
This adds a new quality gate before QA testing begins.

- Added security-scan job
- Updated job dependencies
- Added 2-second delay to simulate scanning

Closes #67
"
```

---

## 📊 Example Commit History

```bash
feat(firmware): add Rev-D board support
fix(qa): resolve test timeout for Rev-B
docs(readme): update pipeline flow diagram
ci(pipeline): add Production environment approval gate
test(firmware): add unit tests for boot sequence
refactor(test): simplify board argument handling
perf(firmware): reduce driver loading time by 30%
chore(deps): update GitHub Actions to v4
```

---

## 🎯 How GitHub Generates Release Notes

When you enable `generate_release_notes: true` in the workflow:

1. **GitHub scans commits** between the previous release and current release
2. **Categorizes commits** by type (feat, fix, docs, etc.)
3. **Groups them** into sections in the release notes
4. **Lists contributors** automatically
5. **Links to PRs and issues** mentioned in commits

### Example Generated Release Notes:

```markdown
## What's Changed

### ✨ New Features
* feat(firmware): add Rev-D board support by @developer in #123
* feat(pipeline): add security scanning job by @developer in #125

### 🐛 Bug Fixes
* fix(qa): resolve test timeout for Rev-B by @developer in #124

### 📚 Documentation
* docs(readme): update pipeline flow diagram by @developer in #126

### 🔧 CI/CD
* ci(pipeline): add Production environment approval gate by @developer in #127

**Full Changelog**: https://github.com/user/repo/compare/v2.0.1...v2.0.2
```

---

## 🛠️ Quick Reference

### Common Commands:

```bash
# Feature
git commit -m "feat(firmware): add new board support"

# Bug fix
git commit -m "fix(qa): resolve validation error"

# Documentation
git commit -m "docs: update README"

# CI/CD change
git commit -m "ci: add security scanning"

# Breaking change
git commit -m "feat(firmware)!: change API format"

# With issue reference
git commit -m "fix(firmware): resolve boot issue" -m "Fixes #42"
```

---

## 📖 Additional Resources

- **Conventional Commits Specification**: https://www.conventionalcommits.org/
- **GitHub Release Notes Documentation**: https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
- **Semantic Versioning**: https://semver.org/

---

## 💡 Pro Tips

1. **Be consistent**: Always use the same format across your team
2. **Be specific**: Include scope when it adds clarity
3. **Be concise**: Keep the first line under 72 characters
4. **Be informative**: Use the body for detailed explanations
5. **Be linked**: Reference issues and PRs for traceability

---

**Following these conventions will ensure your release notes are automatically organized, professional, and easy to understand!** 🚀
