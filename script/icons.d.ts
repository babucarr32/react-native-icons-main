type Icons = {
  id: string;
  name: string;
  path: string;
  logo: string;
  contents: [
    {
      files: string;
    }
  ];
  projectUrl: string;
  license: string;
  licenseUrl: string;
  source: {
    type: string;
    localName: string;
    remoteDir: string;
    url: string;
    branch: string;
    hash: string;
  };
};

export const icons: Icons[];
