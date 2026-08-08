export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} FixItNow. Your Trusted Home Service Platform.
    </footer>
  );
}
