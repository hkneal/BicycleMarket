import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titilize'
})
export class TitilizePipe implements PipeTransform {
  public static skipWords: Array<string> = ['a', 'the', 'of', 'in', 'and', 'or', 'for'];

  transform(value: string, args?: boolean | string[]): string {
    // console.log(value);
    if(typeof value !== 'string'){
      return value;
    }
    const skippedWords = Array.isArray(args) ? args : TitilizePipe.skipWords;
    const processSkipWords: boolean = args !== false;

    return value.replace(/\w[^-\s]*/g, (word, index) => {
      // console.log(word, index);
      if(index && processSkipWords && skippedWords.includes(word.toLowerCase())){
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

}
