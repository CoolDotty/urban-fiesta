Welcome to the XQ technical assessment!

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/KarlTheCool/urban-fiesta)

## What is XQ?

XQ Message is an encryption-as-a-service (EaaS) platform which gives you the tools to encrypt and route data to and from devices like mobile phones, IoT, and connected devices that are at the "edge" of the internet. The XQ platform is a lightweight and highly secure cybersecurity solution that enables self protecting data for perimeterless zero trust data protection, even to devices and apps that have no ability to do so natively.

**IMPORTANT**
In order to utilize the XQ Javascript SDK and interact with XQ servers you will need both a **`General`** API key. To generate this key, follow these steps:

1. Go to your [XQ management portal](https://manage.xqmsg.com/applications).
2. Select or create an application.
3. Create a **`General`** and **`Dashboard`** keys for the XQ framework API.
4. Add them as environment variables, `REACT_APP_XQ_API` and `REACT_APP_XQ_DASH` respectively
5. **If running code on demo api:** In node_modules, `ctrl+shift+f` replace `subscription.xqmsg.net` with `demo-subscription.xqmsg.net` and `validation.xqmsg.net` with `demo-validation.xqmsg.net`

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

Simply create a zip folder of this project and send it to jobs@xqmsg.com

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

That's it! Just Access `http://localhost:3000` in your browser.

### Linting and Format

```
yarn lint
yarn format
```

### Testing

```
yarn test
```
