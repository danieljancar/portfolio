export interface Legal {
  name: string;
  description: string;
  version: string;
  created: string;
  edited: string;
  file: string;
}

export interface LegalJson {
  files: Legal[];
}
