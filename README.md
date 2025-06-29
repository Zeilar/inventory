## Prerequisites

## Problems

- For whatever reason Chakra UI nowadays can't handle hydration/streaming etc. So when using server components, utilize Chakra's `<ClientOnly />` component to act as `loading.tsx`. Do not use any `loading.tsx`.
