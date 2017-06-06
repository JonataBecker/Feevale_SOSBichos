import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'animais', pure:false })
export class AnimaisPipe implements PipeTransform {
  transform(animais: any, filtro:any) {
      var animaisFiltros = animais;
      if (!animaisFiltros) {
          return animaisFiltros;
      }
      if (filtro.especie) {
          animaisFiltros = animaisFiltros.filter((item) => {
              return item.value.especie == filtro.especie;
          });
      }
      if (filtro.raca) {
          animaisFiltros = animaisFiltros.filter((item) => {
              console.log(filtro.raca);
              return item.value.raca == filtro.raca;
          });
      }
      if (filtro.todos) {
          return animaisFiltros;
      }
      return animaisFiltros.filter((item) => {
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
