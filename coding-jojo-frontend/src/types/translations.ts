export interface TranslationSchema {
    search: string;
    login: string;
    signup: string;
    announcement: {
      text: string;
      hours: string;
      minutes: string;
      seconds: string;
      cta: string;
      new: string;
    };
    courses: {
      html: string;
      css: string;
      javascript: string;
      sql: string;
      python: string;
      php: string;
      bootstrap: string;
      jquery: string;
      react: string;
      nodejs: string;
      java: string;
      csharp: string;
      cpp: string;
      typescript: string;
      angular: string;
      vue: string;
      ruby: string;
      django: string;
      mongodb: string;
      aws: string;
      docker: string;
      kubernetes: string;
      devops: string;
      blockchain: string;
      ai: string;
      machinelearning: string;
      datascience: string;
    };
  }
  
  export interface LanguageOption {
    code: string;
    name: string;
  }
  