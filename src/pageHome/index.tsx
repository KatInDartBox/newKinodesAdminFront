import LoginGoogle from "@/src/components/loginGoogle";

export default function PageHome() {
  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
        className="h-full flex items-center justify-center"
      >
        <LoginGoogle />
      </div>
    </>
  );
}
