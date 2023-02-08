const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      experimental: {
        appDir: true,
        runtime: "edge",
        serverComponents:true
      },
    }
  }

  return {
    experimental: {
      appDir: true,
      runtime: "edge",
      serverComponents:true
    },
  }
}
