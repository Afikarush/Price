import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BRAND, PRICING_METHODS } from '../lib/config';
import { colors, fonts } from '../lib/theme';
import { isValidEmail, joinWaitlist } from '../lib/waitlist';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    if (status === 'sending') return;
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('That email doesn’t look right. Check for typos.');
      return;
    }
    if (!method) {
      setStatus('error');
      setMessage('Pick one answer for how you price today.');
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      await joinWaitlist({ email, pricingMethod: method });
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage('Couldn’t save that. Check your connection and try again.');
    }
  }

  if (status === 'done') {
    return (
      <View style={styles.box} accessibilityLiveRegion="polite">
        <Text style={styles.doneTitle}>You’re on the list.</Text>
        <Text style={styles.doneText}>
          We’ll email you once when {BRAND} is ready to try.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Get early access</Text>

      <Text style={styles.label} nativeID="email-label">
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="you@yourshop.com"
        placeholderTextColor="#8C9094"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        inputMode="email"
        accessibilityLabelledBy="email-label"
        aria-label="Email"
        onSubmitEditing={submit}
      />

      <Text style={styles.label}>How do you price your jobs today?</Text>
      <View style={styles.options} accessibilityRole="radiogroup">
        {PRICING_METHODS.map((option) => {
          const selected = method === option;
          return (
            <Pressable
              key={option}
              onPress={() => setMethod(option)}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <View style={[styles.dot, selected && styles.dotSelected]}>
                {selected && <View style={styles.dotInner} />}
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {status === 'error' && !!message && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {message}
        </Text>
      )}

      <Pressable
        onPress={submit}
        disabled={status === 'sending'}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        {status === 'sending' ? (
          <ActivityIndicator color={colors.ink} />
        ) : (
          <Text style={styles.buttonText}>Put me on the list</Text>
        )}
      </Pressable>
      <Text style={styles.fine}>One email when it’s ready. Nothing else.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.ink,
    borderRadius: 4,
    padding: 22,
    width: '100%',
    maxWidth: 440,
  },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginBottom: 18 },
  label: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink, marginBottom: 8 },
  input: {
    fontFamily: fonts.body,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16, // 16+ stops iPhones from zooming in on tap
    color: colors.ink,
    backgroundColor: colors.surface,
    marginBottom: 20,
  },
  options: { borderTopWidth: 1, borderColor: colors.line, marginBottom: 18 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  optionSelected: { backgroundColor: colors.tapeSoft },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotSelected: { borderColor: colors.ink },
  dotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.ink },
  optionText: { fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  error: { fontFamily: fonts.body, color: colors.error, fontSize: 14, marginBottom: 12 },
  button: {
    backgroundColor: colors.tape,
    borderWidth: 1.5,
    borderColor: colors.ink,
    borderRadius: 4,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { transform: [{ translateY: 1 }], opacity: 0.85 },
  buttonText: { fontFamily: fonts.display, color: colors.ink, fontSize: 16 },
  fine: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, marginTop: 10 },
  doneTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.success, marginBottom: 6 },
  doneText: { fontFamily: fonts.body, fontSize: 16, color: colors.ink, lineHeight: 24 },
});
