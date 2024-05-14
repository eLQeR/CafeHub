export default function Page({ params }: { params: { slug: string } }) {
  return <div>details for Place: {params.slug}</div>;
}
