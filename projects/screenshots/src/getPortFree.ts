import net from "net";

export async function getPortFree() {
  return new Promise<number>((res) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const port = srv.address().port;
      srv.close((_err) => res(port));
    });
  });
}
