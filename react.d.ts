// Comprehensive type declarations for React
declare module 'react' {
  type ReactNode = any;
  type ComponentType<P = any> = any;

  export type FC<P = {}> = ComponentType<P>;

  export function useState<S>(initialState: S | (() => S)): [S, (newState: S | ((prevState: S) => S)) => void];
  
  export function useEffect(
    effect: () => (void | (() => void | undefined)), 
    deps?: ReadonlyArray<any>
  ): void;

  export function useMemo<T>(
    factory: () => T, 
    deps?: ReadonlyArray<any>
  ): T;

  export function useCallback<T extends (...args: any[]) => any>(
    callback: T, 
    deps?: ReadonlyArray<any>
  ): T;

  export interface ReactElement<P = any, T extends string | ComponentType<P> = string | ComponentType<P>> {
    type: T;
    props: P;
    key: string | number | null;
  }

  export interface PropsWithChildren<P = unknown> {
    children?: ReactNode;
  }

  type PropsWithChildrenType<P = unknown> = P & { children?: ReactNode };
}
