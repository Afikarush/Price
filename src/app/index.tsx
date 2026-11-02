import Head from 'expo-router/head';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WaitlistForm } from '../components/WaitlistForm';
import { BRAND } from '../lib/config';
import { colors, maxWidth } from '../lib/theme';

const BENEFITS = [
  {
    icon: '🪵',
    title: 'Lumber in board feet, waste included',
    text: 'Enter your cut list. We work out the board feet and add a waste factor, so the wood on your quote is what you really buy.',
  },
  {
    icon: '🛠️',
    title: 'Your true shop rate',
    text: 'Rent, tools, insurance and the wage you want to pay yourself — turned into an hourly rate that actually covers the business.',
  },
  {
    icon: '📄',
    title: 'Client-ready quotes with a deposit',
    text: 'Send a clean, professional quote with the deposit amount and terms spelled out. Look like a pro and get paid before you cut.',
  },
];

export default function Landing() {
  const { width } = useWindowDimensions();
  // The web page is pre-built without knowing the screen size, so we only
  // switch to the wide layout once it has loaded in the visitor's browser.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  const wide = loaded && width >= 860;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Head>
        <title>{`${BRAND} — Stop underpricing your woodworking`}</title>
        <meta
          name="description"
          content="Pricing and quotes for custom woodworkers. Board-foot lumber math with waste, a real shop rate, and professional client quotes with deposits."
        />
      </Head>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.brand}>{BRAND}</Text>

          <View style={[styles.hero, wide && styles.heroWide]}>
            <View style={[styles.heroText, wide && styles.heroTextWide]}>
              <Text style={styles.kicker}>For custom woodworkers</Text>
              <Text
                style={[styles.h1, wide && styles.h1Wide]}
                accessibilityRole="header"
                aria-level={1}
              >
                Stop underpricing.{'\n'}Professional quotes in minutes.
              </Text>
              <Text style={styles.lead}>
                Turn a cut list into a price you can stand behind — lumber, shop time and
                profit included — and send your client a quote that looks the part.
              </Text>
            </View>
            <View style={[styles.formWrap, wide && styles.formWrapWide]}>
              <WaitlistForm />
            </View>
          </View>

          <View style={[styles.benefits, wide && styles.benefitsWide]}>
            {BENEFITS.map((b) => (
              <View key={b.title} style={[styles.benefit, wide && styles.benefitWide]}>
                <Text style={styles.benefitIcon}>{b.icon}</Text>
                <Text style={styles.benefitTitle} accessibilityRole="header" aria-level={2}>
                  {b.title}
                </Text>
                <Text style={styles.benefitText}>{b.text}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footer}>
            © {new Date().getFullYear()} {BRAND} · Built for woodworkers in the US, UK, Canada
            and Australia
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 16 },
  container: { width: '100%', maxWidth, paddingTop: 20, paddingBottom: 32 },
  brand: { fontSize: 18, fontWeight: '800', color: colors.accentDark, letterSpacing: 0.3 },

  hero: { marginTop: 32, gap: 28 },
  heroWide: { flexDirection: 'row', alignItems: 'center', gap: 48, marginTop: 56 },
  heroText: {},
  heroTextWide: { flex: 1 },
  kicker: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    color: colors.accentDark,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  h1: { fontSize: 34, lineHeight: 40, fontWeight: '800', color: colors.text },
  h1Wide: { fontSize: 48, lineHeight: 56 },
  lead: { fontSize: 18, lineHeight: 28, color: colors.muted, marginTop: 16, maxWidth: 520 },
  formWrap: { alignItems: 'center' },
  formWrapWide: { flexShrink: 0, width: 420 },

  benefits: { marginTop: 48, gap: 16 },
  benefitsWide: { flexDirection: 'row', marginTop: 72, gap: 20 },
  benefit: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  benefitWide: { flex: 1 },
  benefitIcon: { fontSize: 28, marginBottom: 10 },
  benefitTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  benefitText: { fontSize: 15, lineHeight: 23, color: colors.muted },

  footer: { marginTop: 48, fontSize: 13, color: colors.muted, textAlign: 'center' },
});
