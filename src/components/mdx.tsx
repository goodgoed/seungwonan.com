import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";

const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  a: CustomLink,
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose">
      <Component components={{ ...components }} />
    </article>
  );
}
