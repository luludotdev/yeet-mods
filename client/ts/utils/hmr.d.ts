// tslint:disable-next-line: interface-name
interface NodeModule {
  hot: {
    accept(
      dependencies: string[],
      callback: (updatedDependencies: string[]) => void
    ): void
    accept(dependency: string, callback: () => void): void
    accept(errHandler?: (err: any) => void): void
    decline(dependencies?: string | string[]): void

    dispose(callback: (data: any) => void): void
    addDisposeHandler(callback: (data: any) => void): void

    removeDisposeHandler(callback: (data: any) => void): void
  }
}
