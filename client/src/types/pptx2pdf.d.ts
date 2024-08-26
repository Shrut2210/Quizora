declare module 'pptx2pdf' {
    function convert(inputFilePath: string, outputFilePath: string): Promise<void>;
  
    export default { convert };
  }