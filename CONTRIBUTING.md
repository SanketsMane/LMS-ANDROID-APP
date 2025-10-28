# Contributing to RankBridge LMS

Thank you for your interest in contributing to RankBridge! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account
- Redis server
- Expo CLI
- Git knowledge

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/LMS-ANDROID-APP.git
   cd LMS-ANDROID-APP
   ```

2. **Set Up Development Environment**
   ```bash
   # Backend
   cd Lms-Mobile-App/server
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev

   # Mobile Client (new terminal)
   cd ../client
   npm install
   npx expo start

   # Admin Panel (new terminal)
   cd ../admin
   npm install
   cp .env.example .env.local
   npm run dev
   ```

## 🔧 Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add mobile number field to user profile
fix(courses): resolve enrolled courses blank page issue
docs(readme): update installation instructions
```

## 📝 Code Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Handle errors appropriately

### React Native
- Use functional components with hooks
- Follow React Native best practices
- Implement proper error boundaries
- Use responsive design principles
- Optimize for performance

### Backend (Node.js)
- Use async/await over promises
- Implement proper error handling
- Validate all inputs
- Use appropriate HTTP status codes
- Follow RESTful API principles

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd Lms-Mobile-App/server
npm test

# Frontend tests
cd ../client
npm test

# Admin panel tests
cd ../admin
npm test
```

### Writing Tests
- Write unit tests for utility functions
- Add integration tests for API endpoints
- Include component tests for React components
- Test error scenarios
- Maintain good test coverage

## 📦 Submitting Changes

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create pull request on GitHub
   - Fill out PR template completely
   - Link related issues

### Pull Request Requirements

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated if needed
- [ ] No merge conflicts
- [ ] Descriptive commit messages
- [ ] PR description explains changes

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Test with latest version
- Reproduce consistently

### Bug Report Template
```markdown
**Describe the Bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- Device: [e.g. iPhone 12, Android Pixel]
- OS: [e.g. iOS 15.0, Android 11]
- App Version: [e.g. 1.0.0]
- Browser: [if web issue]

**Additional Context**
Any other context about the problem
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired outcome

**Describe alternatives considered**
Alternative solutions or features

**Additional context**
Screenshots, mockups, or examples
```

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority-high` - High priority items
- `priority-low` - Low priority items

## 🔍 Code Review Guidelines

### For Reviewers
- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve when code meets standards
- Test functionality when possible

### For Contributors
- Respond to feedback promptly
- Ask questions if unclear
- Make requested changes
- Thank reviewers for their time

## 📚 Resources

### Documentation
- [React Native Docs](https://reactnative.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Node.js Docs](https://nodejs.org/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Expo Docs](https://docs.expo.dev/)

### Useful Tools
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Postman](https://www.postman.com/) for API testing
- [VS Code Extensions](https://code.visualstudio.com/docs/languages/typescript)

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Email**: sanket@example.com for sensitive issues

### Response Times
- Issues: 1-3 business days
- Pull Requests: 2-5 business days
- Questions: 1-2 business days

## 🏆 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor stats

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License that covers the project.

---

Thank you for contributing to RankBridge! 🚀