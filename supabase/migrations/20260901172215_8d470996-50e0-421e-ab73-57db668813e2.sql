
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  caption text,
  species text,
  location text,
  taken_on date,
  image_url text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photos TO authenticated;
GRANT ALL ON public.photos TO service_role;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published photos" ON public.photos FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage photos" ON public.photos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER photos_updated_at BEFORE UPDATE ON public.photos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published notes" ON public.notes FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage notes" ON public.notes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  cover_url text,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage articles" ON public.articles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.photos (title, caption, species, location, taken_on, image_url) VALUES
('சிறிய நீல பட்டாம்பூச்சி', 'அழகும் அமைதியும் ஒருங்கே', 'Common Cerulean', 'கொடைக்கானல்', '2024-05-24', '/__l5e/assets-v1/235b36ce-def6-45bd-9c67-cb483fc9f2d1/card1.jpg'),
('வெண்மையின் நளினம்', 'இலைமீது ஓய்வெடுக்கும் தருணம்', 'Psyche', 'வால்பாறை', '2024-05-20', '/__l5e/assets-v1/92580621-f4e9-41fd-8bd3-12091de2b213/card2.jpg'),
('மன்னன் பட்டாம்பூச்சி', 'மஞ்சள் பூக்களில் ஒரு தங்க நிமிடம்', 'Plain Tiger', 'சாத்தியமங்கலம்', '2024-05-18', '/__l5e/assets-v1/2a3d254a-9f1f-4edf-b034-cf0705012fb2/card3.jpg'),
('கருஞ்சிவப்பு அழகு', 'இயற்கையின் அதிசயம்', 'Common Rose', 'ஆனைமலை', '2024-05-12', '/__l5e/assets-v1/728f87ee-1424-4bc8-893d-a5426b317880/p1.jpg'),
('மஞ்சள் தேவதை', 'பூவின் தோழி', 'Common Grass Yellow', 'திண்டுக்கல்', '2024-05-08', '/__l5e/assets-v1/4b5bddbf-b4e0-4f6a-a78e-45af73eab412/p2.jpg'),
('பனிநிற சிறகுகள்', 'புல்நுனியில் ஒரு கவிதை', 'Psyche', 'ஏற்காடு', '2024-05-02', '/__l5e/assets-v1/6a2926fd-5178-4671-a27f-63d55466bcff/p3.jpg');

INSERT INTO public.notes (title, body, image_url) VALUES
('பட்டாம்பூச்சிகள் கால்களால் சுவைக்கின்றன', 'பட்டாம்பூச்சிகளின் கால்களில் சுவை உணரிகள் உள்ளன. ஒரு இலையின் மீது அமரும்போதே அது தன் குஞ்சுகளுக்கு ஏற்ற உணவுத் தாவரமா என்பதை அறிந்து கொள்கிறது.', '/__l5e/assets-v1/6a2926fd-5178-4671-a27f-63d55466bcff/p3.jpg'),
('சிறகுகளின் நிறம் ஒரு மாயை', 'பல பட்டாம்பூச்சிகளின் பளபளப்பான நீல நிறம் சாயத்தால் அல்ல; சிறகுச் செதில்களில் ஒளி ஒடுங்கி உருவாகும் கட்டமைப்பு நிறமே ஆகும்.', '/__l5e/assets-v1/235b36ce-def6-45bd-9c67-cb483fc9f2d1/card1.jpg'),
('குடிபெயரும் பயணிகள்', 'தமிழ்நாட்டின் மேற்குத் தொடர்ச்சி மலைப் பகுதிகளில் ஆண்டுதோறும் லட்சக்கணக்கான டைகர் இன பட்டாம்பூச்சிகள் கூட்டமாகப் பயணிக்கின்றன.', '/__l5e/assets-v1/2a3d254a-9f1f-4edf-b034-cf0705012fb2/card3.jpg');

INSERT INTO public.articles (slug, title, excerpt, cover_url, content, published_at) VALUES
('pattampoochi-attagam-arimugam', 'பட்டாம்பூச்சிகளின் உலகம்: ஓர் அறிமுகம்', 'சிறகுகளின் வண்ணங்களுக்குப் பின்னால் உள்ள அறிவியலும் அழகியலும்.', '/__l5e/assets-v1/49362763-5824-4dc4-8f6a-19c9b424ab2b/hero.jpg',
'பட்டாம்பூச்சிகள் இயற்கையின் மிக நுட்பமான படைப்புகளுள் ஒன்று. உலகளவில் சுமார் 18,000 இனங்கள் அறியப்பட்டுள்ளன; இந்தியாவில் மட்டும் 1,500-க்கும் மேற்பட்ட இனங்கள் காணப்படுகின்றன.

முட்டை, கம்பளிப்பூச்சி, கூட்டுப்புழு, முதிர்ந்த பட்டாம்பூச்சி என நான்கு நிலைகளைக் கொண்ட உருமாற்றம் இவற்றின் வாழ்க்கைச் சுழற்சி ஆகும். ஒவ்வொரு நிலையும் தனித்துவமான உணவுத் தேவைகளையும் வாழ்விடத் தேவைகளையும் கொண்டது.

பட்டாம்பூச்சிகள் மகரந்தச் சேர்க்கைக்கு உதவுவதுடன், சுற்றுச்சூழலின் ஆரோக்கியத்தைக் காட்டும் குறிகாட்டிகளாகவும் செயல்படுகின்றன. ஒரு பகுதியில் பட்டாம்பூச்சிகளின் எண்ணிக்கை குறையத் தொடங்கினால், அது அந்தச் சூழலில் ஏற்படும் மாற்றத்தின் முதல் எச்சரிக்கை.', now() - interval '3 days'),
('pukaipada-vazhimuraigal', 'பட்டாம்பூச்சி புகைப்படக் கலை: அடிப்படை வழிமுறைகள்', 'அதிகாலை ஒளி, பொறுமை, சரியான தூரம் — சிறந்த படங்களுக்கான ரகசியங்கள்.', '/__l5e/assets-v1/728f87ee-1424-4bc8-893d-a5426b317880/p1.jpg',
'அதிகாலை நேரம் பட்டாம்பூச்சி புகைப்படத்திற்கு மிகச் சிறந்தது. குளிர்ச்சியான காலை வேளையில் அவை மெதுவாக இயங்குவதால் அருகில் சென்று படமெடுக்க முடியும்.

மேக்ரோ லென்ஸ் அல்லது 100mm முதல் 300mm வரையிலான லென்ஸ்கள் பொருத்தமானவை. கண்களை மையமாகக் கொண்டு குவியப்படுத்துங்கள்; பின்னணி மென்மையாக மங்கினால் படம் மேலும் அழகாகும்.

முக்கியமாக — பட்டாம்பூச்சியைத் தொடவோ, பிடிக்கவோ, அதன் வழியை மறிக்கவோ கூடாது. படத்தை விட உயிர் முக்கியம்.', now() - interval '9 days'),
('paadhukaappu-nammakadamai', 'பாதுகாப்பு: நம் தோட்டமே தொடக்கம்', 'சிறிய முயற்சிகள் பட்டாம்பூச்சிகளின் எதிர்காலத்தை மாற்றும்.', '/__l5e/assets-v1/4b5bddbf-b4e0-4f6a-a78e-45af73eab412/p2.jpg',
'பூச்சிக்கொல்லிகளைத் தவிர்ப்பது, உள்ளூர்த் தாவரங்களை வளர்ப்பது, சிறிது நீர் நிலைகளை வைப்பது — இவை மூன்றுமே ஒரு தோட்டத்தைப் பட்டாம்பூச்சிகளின் இல்லமாக மாற்றும்.

எருக்கு, ஆவாரை, துளசி, நொச்சி போன்ற தாவரங்கள் கம்பளிப்பூச்சிகளுக்கு உணவளிக்கின்றன. பூக்கும் தாவரங்கள் முதிர்ந்த பட்டாம்பூச்சிகளுக்குத் தேன் தருகின்றன.

வாழ்விட இழப்பும் பருவநிலை மாற்றமும் இன்று மிகப் பெரிய அச்சுறுத்தல்கள். நம் ஒவ்வொருவரின் சிறு செயலும் ஒரு சிறகின் அசைவைப் போல — சிறியது, ஆனால் தொடர்ச்சியானது.', now() - interval '20 days');
