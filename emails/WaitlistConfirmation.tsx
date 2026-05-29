import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function WaitlistConfirmation({ email = "friend" }: { email?: string }) {
  return (
    <Html>
      <Head />
      <Preview>⚔️ Quest accepted — you&apos;re on the Monstir waitlist!</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Img
              src="https://www.monstirapp.com/logo-color.png"
              alt="Monstir"
              width="140"
              height="52"
              style={{ margin: "0 auto", display: "block" }}
            />
          </Section>

          {/* Hero */}
          <Section style={hero}>
            <Img
              src="https://www.monstirapp.com/hero/hero-bitbot.png"
              alt="BITBOT"
              width="180"
              height="180"
              style={{ margin: "0 auto", display: "block" }}
            />
          </Section>

          {/* Badge */}
          <Section style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={badge}>✦ QUEST ACCEPTED</span>
          </Section>

          {/* Heading */}
          <Heading style={heading}>You&apos;re on the list!</Heading>

          {/* Body */}
          <Text style={paragraph}>
            Hey {email.split("@")[0]}, BITBOT here. 🤖
          </Text>
          <Text style={paragraph}>
            You&apos;ve officially joined the Monstir waitlist. When we launch,
            you&apos;ll be first in line to turn your kids&apos; chores into{" "}
            <strong style={{ color: "#7C3AED" }}>legendary adventures</strong>.
          </Text>

          {/* Hype bar */}
          <Section style={hypeSection}>
            <Text style={hypeLabel}>Hype meter: 72% — almost there 🔥</Text>
            <div style={hypeTrack}>
              <div style={hypeFill} />
            </div>
          </Section>

          {/* What to expect */}
          <Section style={featuresBox}>
            <Text style={featuresTitle}>What&apos;s coming for your kids:</Text>
            {[
              "🧹  Complete chores → earn XP",
              "👾  Level up their Monstir",
              "⚔️  Battle the weekly boss",
              "🎁  Unlock real rewards you choose",
            ].map((item) => (
              <Text key={item} style={featureItem}>{item}</Text>
            ))}
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: "center", marginTop: "32px" }}>
            <Button href="https://www.monstirapp.com" style={button}>
              Visit monstirapp.com
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Text style={footer}>
            You&apos;re receiving this because you signed up at monstirapp.com.
            No spam — ever. We&apos;ll only email you when it matters.
          </Text>
          <Text style={footer}>© 2025 Monstir. All rights reserved.</Text>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#FFFDF7",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "40px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "3px solid #111111",
  borderRadius: "20px",
  boxShadow: "0px 6px 0px #111111",
  maxWidth: "520px",
  margin: "0 auto",
  padding: "0 0 32px",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  backgroundColor: "#F5F0FF",
  padding: "24px 32px 20px",
  textAlign: "center",
};

const hero: React.CSSProperties = {
  padding: "24px 32px 8px",
  textAlign: "center",
};

const badge: React.CSSProperties = {
  backgroundColor: "#D4F20C",
  border: "2px solid #111111",
  borderRadius: "999px",
  color: "#111111",
  display: "inline-block",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "0.1em",
  padding: "6px 14px",
};

const heading: React.CSSProperties = {
  color: "#111111",
  fontSize: "32px",
  fontWeight: "800",
  lineHeight: "1.2",
  margin: "16px 32px 0",
  textAlign: "center",
};

const paragraph: React.CSSProperties = {
  color: "#4B5563",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "12px 32px 0",
};

const hypeSection: React.CSSProperties = {
  margin: "24px 32px 0",
};

const hypeLabel: React.CSSProperties = {
  color: "#9CA3AF",
  fontFamily: "monospace",
  fontSize: "12px",
  margin: "0 0 6px",
};

const hypeTrack: React.CSSProperties = {
  backgroundColor: "#F3F4F6",
  border: "2px solid #111111",
  borderRadius: "999px",
  height: "12px",
  overflow: "hidden",
};

const hypeFill: React.CSSProperties = {
  backgroundColor: "#D4F20C",
  borderRadius: "999px",
  height: "100%",
  width: "72%",
};

const featuresBox: React.CSSProperties = {
  backgroundColor: "#F5F0FF",
  border: "2px solid #111111",
  borderRadius: "16px",
  margin: "24px 32px 0",
  padding: "16px 20px",
};

const featuresTitle: React.CSSProperties = {
  color: "#111111",
  fontSize: "13px",
  fontWeight: "700",
  margin: "0 0 8px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const featureItem: React.CSSProperties = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "4px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#7C3AED",
  border: "2px solid #111111",
  borderRadius: "999px",
  boxShadow: "0px 4px 0px #111111",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "700",
  padding: "12px 32px",
  textDecoration: "none",
};

const divider: React.CSSProperties = {
  borderColor: "#E5E7EB",
  margin: "32px 32px 20px",
};

const footer: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "4px 32px",
  textAlign: "center",
};
