import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;
export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-orange-base hover:rounded-xl  data-[current=true]:text-orange-base data-[current=true]:bg-shape data-[current=true]:rounded-xl p-2"
      {...props}
    />
  );
}
