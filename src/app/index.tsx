import Head from 'expo-router/head';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WaitlistForm } from '../components/WaitlistForm';
import { BRAND } from '../lib/config';
import { colors, fonts, maxWidth } from '../lib/theme';

const BENEFITS = [
  {
    tag: 'BD FT + WASTE',
    title: 'Lumber priced the way you buy it',
    text: 'Enter your cut list. It works out the board feet and adds your waste factor, so the wood line covers what you actually haul home.',
  },
  {
    tag: '$ / SHOP HOUR',
    title: 'A shop rate that pays the bills',
    text: 'Rent, tools, insurance and the wage you want to take home, turned into one hourly number you can quote with confidence.',
  },
  {
    tag: 'DEPOSIT',
    title: 'A quote your client takes seriously',
    text: 'A clean quote with the deposit and payment terms spelled out, so you’re paid for materials before the first cut.',
  },
];

// Example numbers: 14.2 bd ft × 1.15 = 16.3 bd ft × $14.50 ≈ $237.
const SAMPLE = [
  { item: 'Lumber', detail: '8/4 walnut · 14.2 bd ft + 15% waste = 16.3 bd ft @ $14.50', amount: '$237' },
  { item: 'Shop time', detail: '18 h @ $68/h', amount: '$1,224' },
  { item: 'Finish & hardware', detail: 'Oil, brass pulls', amount: '$89' },
];

function Tape() {
  // A strip of tape measure: one tick per 1/4", longer at each inch.
  return (
    <View style={styles.tape} aria-hidden>
      {Array.from({ length: 64 }).map((_, i) => (
        <View
          key={i}
          style={[styles.tick, { height: i % 4 === 0 ? 12 : i % 2 === 0 ? 8 : 5 }]}
        />
      ))}
    </View>
  );
}

function SampleQuote() {
  return (
    <View style={styles.sample}>
      <Text style={styles.sampleHead}>SAMPLE QUOTE · WALNUT CONSOLE TABLE</Text>
      {SAMPLE.map((row) => (
        <View key={row.item} style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowItem}>{row.item}</Text>
            <Text style={styles.rowDetail}>{row.detail}</Text>
          </View>
          <Text style={styles.rowAmount}>{row.amount}</Text>
        </View>
      ))}
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>$1,550</Text>
      </View>
      <View style={styles.depositRow}>
        <Text style={styles.depositLabel}>Deposit due to start (50%)</Text>
        <Text style={styles.depositAmount}>$775</Text>
      </View>
    </View>
  );
}

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
        <title>{`${BRAND} · Pricing and quotes for custom woodworkers`}</title>
        <meta
          name="description"
          content="Price custom woodwork without guessing: board-foot lumber math with waste, a real shop rate, and client quotes with a deposit."
        />
      </Head>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Tape />
        <View style={styles.container}>
          <Text style={styles.brand}>{BRAND}</Text>

          <View style={[styles.hero, wide && styles.heroWide]}>
            <View style={[styles.heroText, wide && styles.heroTextWide]}>
              <Text
                style={[styles.h1, wide && styles.h1Wide]}
                accessibilityRole="header"
                aria-level={1}
              >
                Stop underpricing. Professional quotes in minutes.
              </Text>
              <Text style={styles.lead}>
                For woodworkers who build to order. Turn a cut list into a price that covers
                lumber, shop time and profit, then send the client a proper quote.
              </Text>
              {wide && <SampleQuote />}
            </View>
            <View style={[styles.formWrap, wide && styles.formWrapWide]}>
              <WaitlistForm />
            </View>
            {!wide && <SampleQuote />}
          </View>

          <View style={[styles.benefits, wide && styles.benefitsWide]}>
            {BENEFITS.map((b) => (
              <View key={b.tag} style={[styles.benefit, wide && styles.benefitWide]}>
                <Text style={styles.benefitTag}>{b.tag}</Text>
                <Text style={styles.benefitTitle} accessibilityRole="header" aria-level={2}>
                  {b.title}
                </Text>
                <Text style={styles.benefitText}>{b.text}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footer}>
            {BRAND} · Made for shops in the US, UK, Canada and Australia
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { flexGrow: 1, alignItems: 'center' },
  tape: {
    width: '100%',
    height: 18,
    backgroundColor: colors.tape,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: 2,
    borderBottomWidth: 1.5,
    borderColor: colors.ink,
  },
  tick: { width: 1.5, backgroundColor: colors.ink },
  container: { width: '100%', maxWidth, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 32 },
  brand: { fontFamily: fonts.display, fontSize: 18, color: colors.ink, letterSpacing: 0.2 },

  hero: { marginTop: 28, gap: 28 },
  heroWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 56, marginTop: 52 },
  heroText: { gap: 16 },
  heroTextWide: { flex: 1 },
  h1: { fontFamily: fonts.display, fontSize: 36, lineHeight: 40, color: colors.ink, letterSpacing: -0.5 },
  h1Wide: { fontSize: 54, lineHeight: 58, letterSpacing: -1 },
  lead: { fontFamily: fonts.body, fontSize: 18, lineHeight: 28, color: colors.muted, maxWidth: 540 },
  formWrap: { alignItems: 'center' },
  formWrapWide: { flexShrink: 0, width: 400 },

  sample: {
    marginTop: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    padding: 18,
    maxWidth: 540,
  },
  sampleHead: { fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1, color: colors.muted, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.grid,
  },
  rowText: { flex: 1, minWidth: 0 },
  rowItem: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink },
  rowDetail: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted, marginTop: 2, lineHeight: 18 },
  rowAmount: { fontFamily: fonts.mono, fontSize: 15, color: colors.ink, fontVariant: ['tabular-nums'] },
  totalRow: { borderBottomWidth: 0, justifyContent: 'space-between' },
  totalLabel: { fontFamily: fonts.display, fontSize: 16, color: colors.ink },
  totalAmount: { fontFamily: fonts.mono, fontSize: 17, color: colors.ink },
  depositRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.tapeSoft,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 3,
  },
  depositLabel: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  depositAmount: { fontFamily: fonts.mono, fontSize: 15, color: colors.ink },

  benefits: { marginTop: 56, gap: 28 },
  benefitsWide: { flexDirection: 'row', marginTop: 80, gap: 32 },
  benefit: { borderTopWidth: 1.5, borderColor: colors.ink, paddingTop: 14 },
  benefitWide: { flex: 1 },
  benefitTag: { fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1, color: colors.muted, marginBottom: 8 },
  benefitTitle: { fontFamily: fonts.display, fontSize: 19, lineHeight: 24, color: colors.ink, marginBottom: 6 },
  benefitText: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.muted },

  footer: { fontFamily: fonts.body, marginTop: 56, fontSize: 13, color: colors.muted },
});
