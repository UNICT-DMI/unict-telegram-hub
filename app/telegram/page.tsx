export default function TelegramDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {new Array(10).fill(undefined).map((_, i) => (
        <div
          key={i}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            })`
          }}></div>
      ))}
    </div>
  );
}
