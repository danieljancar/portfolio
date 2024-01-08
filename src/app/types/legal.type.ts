export type Legal = {
  name: string;
  description: string;
  version: string;
  created: string;
  edited: string;
  file: string;
};

export type LegalJson = {
  name: string;
  description: string;
  created: string;
  edited: string;
  files: Legal[];
};
