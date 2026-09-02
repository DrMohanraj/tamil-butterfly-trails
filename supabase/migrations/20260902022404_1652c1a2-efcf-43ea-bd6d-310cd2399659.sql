
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY "Public can view published photos" ON public.photos;
CREATE POLICY "Anyone can view published photos" ON public.photos FOR SELECT TO anon USING (published = true);
CREATE POLICY "Members view photos" ON public.photos FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Public can view published notes" ON public.notes;
CREATE POLICY "Anyone can view published notes" ON public.notes FOR SELECT TO anon USING (published = true);
CREATE POLICY "Members view notes" ON public.notes FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Public can view published articles" ON public.articles;
CREATE POLICY "Anyone can view published articles" ON public.articles FOR SELECT TO anon USING (published = true);
CREATE POLICY "Members view articles" ON public.articles FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
