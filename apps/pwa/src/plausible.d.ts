type Props = Record<string, unknown> | never;
type EventOptions<P extends Props> = {
  props: P;
  callback?: VoidFunction;
};
type EventOptionsTuple<P extends Props> = P extends never
  ? Omit<EventOptions<P>, "props">
  : EventOptions<P>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface PlausibleEvents {}

declare function plausible<Name extends keyof PlausibleEvents>(
  eventName: Name,
  props?: EventOptionsTuple<PlausibleEvents[Name]>
);
