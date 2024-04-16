import { UserProfile } from '@clerk/nextjs'

export default function UserProfilePage() {
  return (
    <UserProfile
      path="/user-profile"
      routing="path"
      appearance={{
        elements: {
          rootBox: 'flex w-full overflow-y-auto',
          card: 'flex flex-1 max-w-full',
          pageScrollBox: 'scrollbar-hide',
        },
      }}
    />
  )
}
