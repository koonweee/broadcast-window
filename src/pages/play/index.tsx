import PlayerPage from "@/components/player";
import AuthenticationBoundary from "@/components/AuthenticationBoundary";
import { UnauthenticatedPage } from "@/components/UnauthenticatedPage";

export default function PlayPage() {
  return (
    <AuthenticationBoundary unauthenticatedComponent={<UnauthenticatedPage featureName="stream player" />}>
      <PlayerPage />
    </AuthenticationBoundary>
  );
}
