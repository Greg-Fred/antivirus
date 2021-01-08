
const VirusComponent = (props) => {

  const { virus } = props;

  const fileIcon = (file) => {
    const pictureMimetype = ["jpeg", "jpg", "png"];
    const videMimetype = ["mp4", "mpeg"];
    const pdfMimetype = ["pdf"];
    const zipMimetype = ["zip"];
    switch (true) {
      case ((pictureMimetype.includes(file.mimetype))):
        return <i class="far text-4xl text-blue-600 opacity-60 fa-file-image"></i>;
        break;
      case ((zipMimetype.includes(file.mimetype))):
        return <i class="far text-4xl text-blue-600 opacity-60 fa-file-archive"></i>;
        break;
      case ((pdfMimetype.includes(file.mimetype))):
        return <i class="far text-4xl text-blue-600 opacity-60 fa-file-pdf"></i>
        break;

      default:
        return <i class="far text-4xl text-blue-600 opacity-60 fa-file"></i>;
        break;
    };
  };


  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {fileIcon(virus)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {virus.name}
            </div>
            <div className="text-sm text-gray-500">
              {`Post Date : ${virus.post_date}`}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{`Size : ${Number((virus.size / 1000).toFixed(1))} ko`}</div>
        <div className="text-sm text-gray-500">{`Type de fichier : ${virus.mimetype}`}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs ${(virus.report === "valid") ? " bg-green-100" : " bg-red-100"} leading-5 font-semibold rounded-full  text-green-800`}>
          {virus.report}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Admin
              </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <h1 className="text-indigo-600 hover:text-indigo-900">Edit</h1>
      </td>
    </tr>
  )

}

export default VirusComponent;
