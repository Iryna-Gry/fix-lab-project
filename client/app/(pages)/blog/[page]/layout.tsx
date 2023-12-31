// export async function generateStaticParams() {
//   const url = `/articles?limit=9`
//   const articlesData = await fetchDataFromServer(url)
//   const currentPage = Array.from(
//     { length: articlesData.totalPages },
//     (_, index) => (index + 1).toString(),
//   )

//   return currentPage.map(item => ({
//     page: item,
//   }))
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
