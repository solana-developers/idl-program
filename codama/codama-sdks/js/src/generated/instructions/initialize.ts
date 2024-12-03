/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { METADATA_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  expectSome,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';

export const INITIALIZE_DISCRIMINATOR = new Uint8Array([
  175, 175, 109, 31, 13, 152, 155, 237,
]);

export function getInitializeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(INITIALIZE_DISCRIMINATOR);
}

export type InitializeInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountIdl extends string | IAccountMeta<string> = string,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountProgramId extends
    | string
    | IAccountMeta<string> = 'pmetaypqG6SiB47xMigYVMAkuHDWeSDXcv3zzDrJJvA',
  TAccountProgramData extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountIdl extends string ? WritableAccount<TAccountIdl> : TAccountIdl,
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner> &
            IAccountSignerMeta<TAccountSigner>
        : TAccountSigner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountProgramId extends string
        ? ReadonlyAccount<TAccountProgramId>
        : TAccountProgramId,
      TAccountProgramData extends string
        ? ReadonlyAccount<TAccountProgramData>
        : TAccountProgramData,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeInstructionData = {
  discriminator: ReadonlyUint8Array;
  seed: string;
};

export type InitializeInstructionDataArgs = { seed: string };

export function getInitializeInstructionDataEncoder(): Encoder<InitializeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['seed', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ]),
    (value) => ({ ...value, discriminator: INITIALIZE_DISCRIMINATOR })
  );
}

export function getInitializeInstructionDataDecoder(): Decoder<InitializeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['seed', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
  ]);
}

export function getInitializeInstructionDataCodec(): Codec<
  InitializeInstructionDataArgs,
  InitializeInstructionData
> {
  return combineCodec(
    getInitializeInstructionDataEncoder(),
    getInitializeInstructionDataDecoder()
  );
}

export type InitializeAsyncInput<
  TAccountIdl extends string = string,
  TAccountSigner extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountProgramId extends string = string,
  TAccountProgramData extends string = string,
> = {
  idl?: Address<TAccountIdl>;
  signer: TransactionSigner<TAccountSigner>;
  systemProgram?: Address<TAccountSystemProgram>;
  programId?: Address<TAccountProgramId>;
  programData: Address<TAccountProgramData>;
  seed: InitializeInstructionDataArgs['seed'];
};

export async function getInitializeInstructionAsync<
  TAccountIdl extends string,
  TAccountSigner extends string,
  TAccountSystemProgram extends string,
  TAccountProgramId extends string,
  TAccountProgramData extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: InitializeAsyncInput<
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId,
    TAccountProgramData
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  InitializeInstruction<
    TProgramAddress,
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId,
    TAccountProgramData
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    idl: { value: input.idl ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    programId: { value: input.programId ?? null, isWritable: false },
    programData: { value: input.programData ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.programId.value) {
    accounts.programId.value = programAddress;
    accounts.programId.isWritable = false;
  }
  if (!accounts.idl.value) {
    accounts.idl.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder()).encode(
          expectSome(args.seed)
        ),
        getAddressEncoder().encode(expectAddress(accounts.programId.value)),
      ],
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.idl),
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.programId),
      getAccountMeta(accounts.programData),
    ],
    programAddress,
    data: getInitializeInstructionDataEncoder().encode(
      args as InitializeInstructionDataArgs
    ),
  } as InitializeInstruction<
    TProgramAddress,
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId,
    TAccountProgramData
  >;

  return instruction;
}

export type InitializeInput<
  TAccountIdl extends string = string,
  TAccountSigner extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountProgramId extends string = string,
  TAccountProgramData extends string = string,
> = {
  idl: Address<TAccountIdl>;
  signer: TransactionSigner<TAccountSigner>;
  systemProgram?: Address<TAccountSystemProgram>;
  programId?: Address<TAccountProgramId>;
  programData: Address<TAccountProgramData>;
  seed: InitializeInstructionDataArgs['seed'];
};

export function getInitializeInstruction<
  TAccountIdl extends string,
  TAccountSigner extends string,
  TAccountSystemProgram extends string,
  TAccountProgramId extends string,
  TAccountProgramData extends string,
  TProgramAddress extends Address = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
>(
  input: InitializeInput<
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId,
    TAccountProgramData
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeInstruction<
  TProgramAddress,
  TAccountIdl,
  TAccountSigner,
  TAccountSystemProgram,
  TAccountProgramId,
  TAccountProgramData
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? METADATA_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    idl: { value: input.idl ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    programId: { value: input.programId ?? null, isWritable: false },
    programData: { value: input.programData ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.programId.value) {
    accounts.programId.value = programAddress;
    accounts.programId.isWritable = false;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.idl),
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.programId),
      getAccountMeta(accounts.programData),
    ],
    programAddress,
    data: getInitializeInstructionDataEncoder().encode(
      args as InitializeInstructionDataArgs
    ),
  } as InitializeInstruction<
    TProgramAddress,
    TAccountIdl,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountProgramId,
    TAccountProgramData
  >;

  return instruction;
}

export type ParsedInitializeInstruction<
  TProgram extends string = typeof METADATA_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    idl: TAccountMetas[0];
    signer: TAccountMetas[1];
    systemProgram: TAccountMetas[2];
    programId: TAccountMetas[3];
    programData: TAccountMetas[4];
  };
  data: InitializeInstructionData;
};

export function parseInitializeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      idl: getNextAccount(),
      signer: getNextAccount(),
      systemProgram: getNextAccount(),
      programId: getNextAccount(),
      programData: getNextAccount(),
    },
    data: getInitializeInstructionDataDecoder().decode(instruction.data),
  };
}
