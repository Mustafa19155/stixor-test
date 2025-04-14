const Page = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  console.log("asd");
  return (
    <div>
      <h1>{process.env.NEXT_PUBLIC_API_URL}</h1>
      <h1>Hello World</h1>
    </div>
  );
};

export default Page;
