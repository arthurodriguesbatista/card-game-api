import { Transform, TransformFnParams } from 'class-transformer';

export function TransformTake() {
  return Transform((param: TransformFnParams) => {
    if (!param.value) return 10;
    const take = parseInt(param.value, 10);
    if (take === 0) return undefined;
    return take;
  });
}

export function TransformInt() {
  return Transform((param: TransformFnParams) => {
    return parseInt(param.value, 10) || undefined;
  });
}
