/**
 * One field, one button
 * It posts to an address as well as calling a handler, so it still works if
 * JavaScript never arrives.
 */
"use client";

import { NewsletterSignup, Text } from "@beton-ui/react";
import { useState } from "react";

export default function NewsletterSignupBasic() {
  const [subscribed, setSubscribed] = useState("");

  return (
    <div className="w-full">
      <NewsletterSignup
        headingLevel={2}
        title="Get the release notes"
        description="One email per release, with what changed and what broke."
        note="Unsubscribe in one click. No other email, ever."
        action="/subscribe"
        onSubscribe={setSubscribed}
      />
      {subscribed ? <Text>Thank you. We will write to {subscribed}.</Text> : null}
    </div>
  );
}
