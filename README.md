Welcome to the XQ technical assessment!

## What is XQ?

XQ Message is an encryption-as-a-service (EaaS) platform which gives you the tools to encrypt and route data to and from devices like mobile phones, IoT, and connected devices that are at the "edge" of the internet. The XQ platform is a lightweight and highly secure cybersecurity solution that enables self protecting data for perimeterless zero trust data protection, even to devices and apps that have no ability to do so natively.

## Assessment

Firstly, thank you for taking the time to help us here at XQ better assess your skills, knowledge and habits as a professional software developer. We at XQ very much value and respect your time, therefore we hope you can spend only 2-4 hours on this project. If you can finish faster — great! If not, limit yourself and don't spend much longer than 4 hours MAX.

Your task, should you choose to accept it, is to carve out the recommended 2-4 hours of time and create a single page app (SPA). The goal is not to create a perfectly designed, feature-complete, polished web application, but to follow best practices and ensure the project is stable and well documented.

**IMPORTANT**
In order to utilize the XQ Javascript SDK and interact with XQ servers you will need both a **`General`** API key. To generate this key, follow these steps:

1. Go to your [XQ management portal](https://manage.xqmsg.com/applications).
2. Select or create an application.
3. Create a **`General`** key for the XQ framework API.

You will build a simple screen which contains a central interface component. You will utilize several services of the [XQ Javascript SDK](https://www.npmjs.com/package/@xqmsg/jssdk-core) to allow the user to:

1.  input a string into an input field
2.  submit the string input via a simple button labeled "encrypt", and encrypt the string
3.  display the encrypted string
4.  decrypt the encrypted string via a simple button labeled "decrypt"
5.  display the decrypted string

**Be sure to add the XQ Javascript SDK to the project via `yarn add`. This is the only required dependency not included with this project boilerplate.**

Before using any of the services from the XQ Javscript SDK, you will need to ensure to either use [Authorize](https://github.com/xqmsg/jssdk-core#authorization) _or_ [AuthorizeAlias](https://github.com/xqmsg/jssdk-core#connect-to-an-alias-account). The differences between the two are as follows:

`Authorize` - allows you to request an access token for a particular email address or telephone number, then use `CodeValidator` to validate and replace the temporary token they received previously for a valid access token. This is a two-step process!

`AuthorizeAlias` allows you to immediately authorize an access token for a particular email address or telephone number. `AuthorizeAlias` may be used for storing and retrieving keys, but not for anything else!

# Requirements

- Use of the [XQ Javascript SDK](https://www.npmjs.com/package/@xqmsg/jssdk-core)
- User can successfully encrypt a string, view the encrypted value, and successfully decrypt and view the decrypted string
- Use of React Hooks
- Unit test coverage
- A basic `README.md` (feel free to replace this one, or to rename it) explaining your implementation in simple terms

# Bonus (optional)

- Design - The app is functional and has stylistic flair! Colors, size, placement, sequencing, transitions, etc.
- Documentation - code doesn't always have implicit meaning/explanation. Feel free to add relevant in-line documentation to communicate concepts and functionality of certain functions or snippets.
- Developer experience (DX) additions - are there any utilities or tools to help the flow of development, especially if this project were passed to another member of your team?

# Delivery Instructions

Don't create a fork! Simply send us the link to your repository and be sure to make it public.

# Usage

This project requires the latest LTS version of NodeJS. You may also need to install the yarn as global dependency:

```bash
npm install -g yarn
```

After you have cloned this repo and install the yarn, install the dependencies with:

```
yarn install
```

You can then start the application running:

```
yarn start
```

That's it. Just Access `http://localhost:3000` in your browser.

### Linting and Format

```
yarn lint
yarn format
```

### Testing

```
yarn test
```
