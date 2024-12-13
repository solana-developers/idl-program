# IDL Registry Program

## Description

A program that can save any metadata linked to your program.
The main usecase being IDL and a metadata json with name, logo and contact infos similar to security.txt.
The trick is that only the program upgrade authority can create the canonical PDA. This makes the metadata very easy to find by just using the seeds "idl", "metadata" or anything else you want.

Also instead of the whole IDL or metadata json people can choose to just upload a URL to the IDL instead to save on chain space and make updates easy.

The the moment the IDL and Metadata are not yet merged into Solana explorer but here is a preview build that can show you how it looks like:
https://explorer-dun.vercel.app/address/6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A/program-metadata?cluster=devnet
https://explorer-dun.vercel.app/address/6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A/idl?cluster=devnet

## CLI Usage

### Installation

There is no need to install the CLI you can just run it with npx:

```bash
npx solana-program-metadata
```

### Commands

#### IDL Commands

Upload IDL from a JSON file. This will write the IDL compressed to the metadata account:

```bash
npx solana-program-metadata idl upload <file> <program-id> \
  [-k <keypair-path>] \
  [-u <rpc-url>] \
  [-p <priority-fees>]
```

Upload IDL from URL. This will write a URL to a json file to the metadata account:

```bash
npx solana-program-metadata idl upload-url <url> <program-id> \
  [-k <keypair-path>] \
  [-u <rpc-url>] \
  [-p <priority-fees>]
```

Download IDL to file:

```bash
npx solana-program-metadata idl download <program-id> [output-file] \
  [-u <rpc-url>]
```

#### Metadata Commands

You can also upload metadata for you program. This is the recommended format of the metadata json file. Similar to security.txt.

```json
{
  "name": "MyProgramName",
  "logo": "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
  "description": "Example program for meta data",
  "notification": "On the first of january we will release a new version! Please update your SDKS!!!!",
  "sdk": "https://github.com/solana-developers/js_sdk",
  "project_url": "https://github.com/solana-developers/",
  "contacts": [
    "email:security@example.com",
    "discord:MyProgram#1234",
    "twitter:@MyProgram"
  ],
  "policy": "https://example.com/security-policy",
  "preferred_languages": ["en", "de"],
  "encryption": "https://example.com/pgp-key",
  "source_code": "https://github.com/solana-developers/",
  "source_release": "v0.1.0",
  "source_revision": "abc123def456",
  "auditors": ["Audit Firm A", "Security Researcher B"],
  "acknowledgements": "https://example.com/security-acknowledgements",
  "expiry": "2024-12-31",
  "version": "0.1.0"
}
```

Upload metadata from JSON file:

```bash
npx solana-program-metadata metadata upload <file> <program-id> \
  [-k <keypair-path>] \
  [-u <rpc-url>] \
  [-p <priority-fees>]
```

Upload metadata from URL:

```bash
npx solana-program-metadata metadata upload-url <url> <program-id> \
  [-k <keypair-path>] \
  [-u <rpc-url>] \
  [-p <priority-fees>]
```

Download metadata to file:

```bash
npx solana-program-metadata metadata download <program-id> [output-file] \
  [-u <rpc-url>]
```

### Options

- `-k, --keypair <path>`: Path to keypair file (optional, defaults to local Solana config)

* `-u, --url <string>`: Custom RPC URL (optional)
* `-ul, --url-local`: Use localhost RPC (default)
* `-ud, --url-devnet`: Use Devnet RPC
* `-um, --url-mainnet`: Use Mainnet RPC

- `-p, --priority-fees <number>`: Priority fees per compute unit (optional, defaults to 100000)

- `-a, --add-signer-seed`: Add signer's public key as additional seed. This will create not associated metadata which needs this seed to be found instead of just using the seeds "idl", "metadata" and the program id. (optional, defaults to false)

### Examples

```bash
# Upload IDL using default keypair that is the program authority
npx solana-program-metadata idl upload ./target/idl/my_program.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A

# Upload metadata with custom keypair to devnet
npx solana-program-metadata metadata upload ./metadata.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A \
  -k ./my-keypair.json \
  -ud

# Upload metadata with non-associated PDA (using signer's pubkey as additional seed creating a non associated metadata account)
npx solana-program-metadata metadata upload-url https://example.com/metadata.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A \
  --add-signer-seed

# Download associated metadata (default)
npx solana-program-metadata metadata download 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A ./my-metadata.json

# Download non-associated metadata (requires signer's pubkey)
npx solana-program-metadata metadata download 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A ./my-metadata.json \
  -s tes5FTVnmJAeq2Nb1Uv15pqiRuPdCHmCSThVbUNfe37

npx solana-program-metadata idl upload tests/testidl.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A \
  -k tests/wallet2.json -ud

npx solana-program-metadata metadata upload tests/metadata.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A \
  -k tests/wallet2.json -ud

npx solana-program-metadata metadata upload-url https://raw.githubusercontent.com/solana-developers/idl-program/refs/heads/main/tests/metadata.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A \
  -k tests/wallet2.json -ud

```

## JavaScript Usage

```typescript
await uploadIdlUrl(url, programId, keypair, rpcUrl, priorityFees);
```

or

```typescript
await uploadIdlByJsonPath(
  pathToJsonFile,
  programId,
  keypair,
  rpcUrl,
  priorityFees
);
```

Then you can retrieve the IDL or URL using:

```typescript
await fetchIDL(programId, rpcUrl);
```

and the metadata using:

```typescript
await fetchProgramMetadata(programId, rpcUrl);
```

### Non-Associated PDAs

When using the `-a, --add-signer-seed` option, the program will add the signer's public key as an additional seed when deriving the PDA. This creates a non-associated PDA that is unique to that signer, allowing multiple metadata entries for the same program. Note that these can not easily be found anymore by just using the seeds "idl", "metadata" and the program id.
This can be useful though if there is some entity that wants to upload metadata for a program but does not have the authority to do so.

## TODO

- move upgrade authority to multisig and deploy program to mainnet
- Add test case for bigger 10mb IDLs.
- Write Web3js@2 cli using codama (generated client is already in the codama folder) (Good first issue)
- validate URL parameters (e.g. no trailing slashes, starts with https:// etc.)

## Done

- add check for authority in program
- add close account instruction
- refactor to make the program more metadata instead of only IDL focused
- Should we add a seed to IdlAccount?
- Add Support for non canonical PDAs. Needed? Will make the program more complex.
- Add URL support
- Add programId to PDA seeds
- Close Buffer account when done with it
- Remove signer from the PDA seeds and use the program authority check in program instead!
  - Now canonical IDL can actually be found by only the program id \o/
- Realloc when IDL becomes bigger or smaller than initially allocated
- Move realloc into set buffer and combine with close buffer
- Test case of < 10240 bytes IDL
- Enable tests for other ppl using a devnet program and hardcoded key for tests
- Remove anchor dependency from JS
- Add priority fees to transactions
- Add support for any program meta data using a dynamic seed string instead of hardcoded "idl"
- Add Test case for uploading program Logo meta data
- Add delete authority instruction
- Add change authority instruction
- Create JS library and CLI
- Create Rust CLI (assignee @wealthineer)
- add metadata init command
- local rpc url from solana config

## Local development

You can test the cli commands like this:

```bash
npm run cli -- idl upload ../tests/testidl.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A  -k "../tests/wallet2.json"

npm run cli -- metadata upload ../tests/metadata.json 6XzaKuAwqP7Nn37vwRdUqpuzNX6K8s1ADE6tHXSZG17A  -k "../tests/wallet2.json"
```

Run tests

```bash
anchor test --detach
```

Like this you will be able to work locally without deploying the program to the network.
