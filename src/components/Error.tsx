export default function Error({ message }: { message: string }) {
  return <p className="text-sm italic text-primary-light-red">{message}</p>;
}
