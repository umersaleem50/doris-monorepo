export interface IFilterOptions {
  text: string;
  type: 'select' | 'range';
  name: string;
  options: { name: string; value: string }[] | number[];
}
export const filterOptions: IFilterOptions[] = [
  {
    text: 'By popularity',
    type: 'select',
    name: 'sort',
    options: [
      {
        name: 'Most Rated',
        value: '-rating',
      },
      {
        name: 'Least Rated',
        value: '+rating',
      },
    ],
  },
  {
    text: 'Size',
    type: 'select',
    name: 'sizes',
    options: [
      {
        name: 'X-Large',
        value: 'xl',
      },
      {
        name: 'Large',
        value: 'l',
      },
      {
        name: 'Medium',
        value: 'm',
      },
      {
        name: 'Small',
        value: 's',
      },
      {
        name: 'X-Small',
        value: 'xs',
      },
    ],
  },
  {
    text: 'Price: ',
    type: 'range',
    name: 'price[lte]',
    options: [0, 20000],
  },
];
