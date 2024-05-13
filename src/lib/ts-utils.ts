
export function kebabToCamelCase(input: string): string {
  return input.split('-').map((word, index) => {
    if (index === 0) {
      return word;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }).join('');
}

export function toUpperSnake(text: string): string {
  return text
    .split('-')
    .map(word => word.toUpperCase())
    .join('_');
}


export function groupByField<T>(items: T[], field: keyof T): {[key: string]: T[]} {
  return items.reduce<{[key: string]: T[]}>((acc, item) => {
    const key = String(item[field]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}
