// Main language data index - imports all language data
import htmlData from './html';
import cssData from './css';
import javascriptData from './javascript';
import typescriptData from './typescript';
import pythonData from './python';
import reactData from './react';
import javaData from './java';
import cppData from './cpp';
import csharpData from './csharp';
import phpData from './php';
import rubyData from './ruby';
import goData from './go';
import rustData from './rust';
import swiftData from './swift';
import kotlinData from './kotlin';
import dartData from './dart';
import scalaData from './scala';
import rData from './r';
import matlabData from './matlab';
import vuejsData from './vuejs';
import angularData from './angular';
import nodejsData from './nodejs';
import nextjsData from './nextjs';
import svelteData from './svelte';
import expressjsData from './expressjs';
import djangoData from './django';
import flaskData from './flask';
import springbootData from './springboot';
import laravelData from './laravel';
import rubyonrailsData from './rubyonrails';
import aspnetData from './aspnet';
import reactnativeData from './reactnative';
import flutterData from './flutter';
import ionicData from './ionic';
import xamarinData from './xamarin';
import unityData from './unity';
import unrealengineData from './unrealengine';
import mongodbData from './mongodb';
import postgresqlData from './postgresql';
import mysqlData from './mysql';
import redisData from './redis';
import firebaseData from './firebase';
import supabaseData from './supabase';
import awsData from './aws';
import azureData from './azure';
import googlecloudData from './googlecloud';
import dockerData from './docker';
import kubernetesData from './kubernetes';
import devopsData from './devops';
import machinelearningData from './machinelearning';
import datascienceData from './datascience';
import aiData from './ai';
import deeplearningData from './deeplearning';
import tensorflowData from './tensorflow';
import pytorchData from './pytorch';
import blockchainData from './blockchain';
import web3Data from './web3';
import solidityData from './solidity';
import ethereumData from './ethereum';
import bitcoinData from './bitcoin';
import defiData from './defi';
import cybersecurityData from './cybersecurity';
import ethicalhackingData from './ethicalhacking';
import networksecurityData from './networksecurity';
import cloudsecurityData from './cloudsecurity';
import uiuxdesignData from './uiuxdesign';
import figmaData from './figma';
import adobexdData from './adobexd';
import sketchData from './sketch';
import photoshopData from './photoshop';
import illustratorData from './illustrator';

// Combined language data object
export const languageData: { [key: string]: any } = {
  html: htmlData,
  css: cssData,
  javascript: javascriptData,
  typescript: typescriptData,
  python: pythonData,
  react: reactData,
  java: javaData,
  cpp: cppData,
  csharp: csharpData,
  php: phpData,
  ruby: rubyData,
  go: goData,
  rust: rustData,
  swift: swiftData,
  kotlin: kotlinData,
  dart: dartData,
  scala: scalaData,
  r: rData,
  matlab: matlabData,
  vuejs: vuejsData,
  angular: angularData,
  nodejs: nodejsData,
  nextjs: nextjsData,
  svelte: svelteData,
  expressjs: expressjsData,
  django: djangoData,
  flask: flaskData,
  springboot: springbootData,
  laravel: laravelData,
  rubyonrails: rubyonrailsData,
  aspnet: aspnetData,
  reactnative: reactnativeData,
  flutter: flutterData,
  ionic: ionicData,
  xamarin: xamarinData,
  unity: unityData,
  unrealengine: unrealengineData,
  mongodb: mongodbData,
  postgresql: postgresqlData,
  mysql: mysqlData,
  redis: redisData,
  firebase: firebaseData,
  supabase: supabaseData,
  aws: awsData,
  azure: azureData,
  googlecloud: googlecloudData,
  docker: dockerData,
  kubernetes: kubernetesData,
  devops: devopsData,
  machinelearning: machinelearningData,
  datascience: datascienceData,
  ai: aiData,
  deeplearning: deeplearningData,
  tensorflow: tensorflowData,
  pytorch: pytorchData,
  blockchain: blockchainData,
  web3: web3Data,
  solidity: solidityData,
  ethereum: ethereumData,
  bitcoin: bitcoinData,
  defi: defiData,
  cybersecurity: cybersecurityData,
  ethicalhacking: ethicalhackingData,
  networksecurity: networksecurityData,
  cloudsecurity: cloudsecurityData,
  uiuxdesign: uiuxdesignData,
  figma: figmaData,
  adobexd: adobexdData,
  sketch: sketchData,
  photoshop: photoshopData,
  illustrator: illustratorData,
};

// Export all individual language data for direct imports
export {
  htmlData,
  cssData,
  javascriptData,
  typescriptData,
  pythonData,
  reactData,
  javaData,
  cppData,
  csharpData,
  phpData,
  rubyData,
  goData,
  rustData,
  swiftData,
  kotlinData,
  dartData,
  scalaData,
  rData,
  matlabData,
  vuejsData,
  angularData,
  nodejsData,
  nextjsData,
  svelteData,
  expressjsData,
  djangoData,
  flaskData,
  springbootData,
  laravelData,
  rubyonrailsData,
  aspnetData,
  reactnativeData,
  flutterData,
  ionicData,
  xamarinData,
  unityData,
  unrealengineData,
  mongodbData,
  postgresqlData,
  mysqlData,
  redisData,
  firebaseData,
  supabaseData,
  awsData,
  azureData,
  googlecloudData,
  dockerData,
  kubernetesData,
  devopsData,
  machinelearningData,
  datascienceData,
  aiData,
  deeplearningData,
  tensorflowData,
  pytorchData,
  blockchainData,
  web3Data,
  solidityData,
  ethereumData,
  bitcoinData,
  defiData,
  cybersecurityData,
  ethicalhackingData,
  networksecurityData,
  cloudsecurityData,
  uiuxdesignData,
  figmaData,
  adobexdData,
  sketchData,
  photoshopData,
  illustratorData,
};

// Export language keys for easy iteration
export const languageKeys = Object.keys(languageData);

// Helper function to get language data by key
export const getLanguageData = (key: string) => {
  return languageData[key as keyof typeof languageData];
};

// Helper function to get all languages as an array
export const getAllLanguages = () => {
  return Object.values(languageData);
};

// Helper function to search languages by name or description
export const searchLanguages = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return Object.entries(languageData).filter(([key, data]) =>
    key.toLowerCase().includes(lowercaseQuery) ||
    data.description?.toLowerCase().includes(lowercaseQuery)
  );
};
