// serviceIndex will be used in Task 3 when the real Three.js scene is added
// eslint-disable-next-line no-unused-vars
export default function ServicesApple3D({ serviceIndex, color }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 600,
        height: 500,
        background: `radial-gradient(circle at 50% 50%, ${color}22, #000 70%)`,
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)',
        fontSize: 14,
      }}
    >
      Three.js canvas — Task 3
    </div>
  )
}
