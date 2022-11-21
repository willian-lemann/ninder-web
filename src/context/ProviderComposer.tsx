export interface IProviderComposerProps extends React.PropsWithChildren {
  /**
   *  Providers list
   * */
  with: any[];
}

const ComposerFragment: React.FC<React.PropsWithChildren> = ({
  children,
}): JSX.Element => <>{children}</>;

const providerReducer =
  (
    ParentProvider: React.FC<React.PropsWithChildren>,
    ChildProvider: React.FC<React.PropsWithChildren>
  ) =>
  ({ children }: React.PropsWithChildren) =>
    (
      <ParentProvider>
        <ChildProvider>{children}</ChildProvider>
      </ParentProvider>
    );

export const ProviderComposer = (props: IProviderComposerProps) => {
  const ComposedProviders = props.with.reduce(
    providerReducer,
    ComposerFragment
  );

  return <ComposedProviders>{props.children}</ComposedProviders>;
};
