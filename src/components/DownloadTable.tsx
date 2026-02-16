export default function DownloadTable() {
  const downloads = [
    { id: 1, format: 'MP4', quality: '1080p', size: '25 MB' },
    { id: 2, format: 'MP4', quality: '720p', size: '14 MB' },
    { id: 3, format: 'MP4', quality: '480p', size: '8 MB' },
    { id: 4, format: 'MP3', quality: '320kbps', size: '5 MB' },
    { id: 5, format: 'MP3', quality: '128kbps', size: '2 MB' },
  ];

  const handleDownload = (format: string, quality: string) => {
    // In real app, this would trigger an actual download
    console.log(`Descargando ${format} - ${quality}`);
    alert(`Iniciando descarga: ${format} ${quality}`);
  };

  return (
    <div className="table-responsive download-table mt-4">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Formato</th>
            <th>Calidad</th>
            <th>Tamaño</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.format}</strong>
              </td>
              <td>{item.quality}</td>
              <td>{item.size}</td>
              <td>
                <button
                  onClick={() => handleDownload(item.format, item.quality)}
                  className="btn btn-sm btn-primary"
                >
                  <i className="bi bi-download me-1"></i>Descargar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
