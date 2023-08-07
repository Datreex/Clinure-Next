import Link from "next/link";

export default function Page({ params }: { params: { lang: string } }) {
  //just for dev purposes, just set a link to the [study_id] page and let it be nice
  return (
    <div>
      <Link href={`/${params.lang}/patients`}>Home</Link>
    </div>
  );
}
