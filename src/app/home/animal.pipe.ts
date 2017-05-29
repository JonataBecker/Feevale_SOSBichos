import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'animais' })
export class AnimaisPipe implements PipeTransform {
  transform(animais: any, filtro:any) {
      if (!filtro) {
          return animais;
      }
      return animais.filter((item) => {
          let animal = item.value;
          if (filtro.adocao) {
              if (!animal.adocao || animal.adocao.length == 0) {
                  return false;
              }
              return animal.adocao.filter((adocao) => {
                  return adocao == filtro.adocao;
              }).length > 0;
          }
          return animal.dono == filtro.dono;
      });
  }
}
