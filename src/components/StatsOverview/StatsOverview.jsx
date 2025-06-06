"use client"

import {
  OverviewContainer,
  OverviewCard,
  CardHeader,
  CardTitle,
  CardContent,
  MainStat,
  MainValue,
  MainUnit,
  SubStats,
  SubStat,
  SubStatLabel,
  SubStatValue,
  ProgressBar,
  ProgressFill,
  GameCard,
  GameImage,
  GameInfo,
  GameName,
  GameCount,
  PartnerCard,
  PartnerInfo,
  PartnerName,
  PartnerCount,
} from "./StatsOverview.styles"
import { Trophy, Calendar, Star, Users } from "lucide-react"

const StatsOverview = ({ stats = {} }) => {
  console.log("📊 Stats data received:", stats)
  console.log("📊 Most played with friend:", stats.mostPlayedWithFriend)

  // Función para validar y formatear números
  const safeNumber = (value, defaultValue = 0) => {
    const num = Number(value)
    return isNaN(num) ? defaultValue : num
  }

  // Función para formatear porcentajes
  const formatPercentage = (value) => {
    const num = safeNumber(value, 0)
    return num.toFixed(1)
  }

  // MEJORADO: Función para obtener el nombre del compañero
  const getPartnerDisplayName = () => {
    const partner = stats.mostPlayedWithFriend
    console.log("🤝 Partner data for display:", partner)

    if (!partner) {
      console.log("❌ No partner data found")
      return "Sin compañero frecuente"
    }

    // Priorizar username, luego name, luego email (sin @domain)
    if (partner.username && partner.username.trim() !== "") {
      console.log("✅ Using username:", partner.username)
      return partner.username
    }

    if (partner.name && partner.name.trim() !== "") {
      console.log("✅ Using name:", partner.name)
      return partner.name
    }

    if (partner.email && partner.email.trim() !== "") {
      const emailName = partner.email.split("@")[0]
      console.log("✅ Using email name:", emailName)
      return emailName
    }

    console.log("⚠️ No valid name found, using fallback")
    return "Usuario sin nombre"
  }

  // MEJORADO: Función para verificar si hay datos válidos del compañero
  const hasValidPartnerData = () => {
    const partner = stats.mostPlayedWithFriend

    if (!partner) {
      console.log("🔍 No partner object found")
      return false
    }

    const hasCount = partner.count && partner.count > 0
    const hasIdentifier = partner.name || partner.username || partner.email

    console.log("🔍 Partner validation:", {
      hasPartner: !!partner,
      hasCount: hasCount,
      count: partner.count,
      hasName: !!partner.name,
      hasUsername: !!partner.username,
      hasEmail: !!partner.email,
      hasIdentifier: !!hasIdentifier,
      finalValidation: hasCount && hasIdentifier,
    })

    return hasCount && hasIdentifier
  }

  // Extraer datos del backend
  const totalMatches = safeNumber(stats.totalMatches)
  const totalWins = safeNumber(stats.wins)
  const winRate = safeNumber(stats.winRate)
  const monthlyMatches = safeNumber(stats.matchesThisMonth)
  const monthlyUniqueGames = safeNumber(stats.uniqueGamesThisMonth)

  // Calcular partidas semanales (estimación)
  const weeklyMatches = Math.min(Math.ceil(monthlyMatches / 4), monthlyMatches)

  // Calcular juegos únicos totales
  let uniqueGamesTotal = monthlyUniqueGames
  if (stats.mostPlayedGame && stats.mostPlayedGame.count) {
    const mostPlayedCount = stats.mostPlayedGame.count
    const estimatedGames = Math.ceil(totalMatches / mostPlayedCount)
    uniqueGamesTotal = Math.max(monthlyUniqueGames, estimatedGames)
  }

  // Estimar total de compañeros únicos
  let totalPartners = 0
  if (totalMatches > 0) {
    // Estimación más realista basada en el total de partidas
    totalPartners = Math.max(1, Math.ceil(totalMatches / 5))
  }

  console.log("📈 Processed data:", {
    totalMatches,
    totalWins,
    winRate,
    monthlyMatches,
    weeklyMatches,
    monthlyUniqueGames,
    uniqueGamesTotal,
    hasValidPartnerData: hasValidPartnerData(),
    partnerName: getPartnerDisplayName(),
    partnerCount: stats.mostPlayedWithFriend?.count,
    totalPartners,
  })

  return (
    <OverviewContainer>
      {/* Partidas Jugadas */}
      <OverviewCard $accentColor="#007bff">
        <CardHeader>
          <CardTitle $iconColor="#007bff">
            <Calendar size={20} />
            Partidas Jugadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>{totalMatches}</MainValue>
            <MainUnit>partidas jugadas</MainUnit>
          </MainStat>
          <SubStats>
            <SubStat>
              <SubStatLabel>{weeklyMatches} partidas jugadas esta semana</SubStatLabel>
            </SubStat>
            <SubStat>
              <SubStatLabel>{monthlyMatches} partidas jugadas este mes</SubStatLabel>
            </SubStat>
          </SubStats>
        </CardContent>
      </OverviewCard>

      {/* Rendimiento */}
      <OverviewCard $accentColor="#28a745">
        <CardHeader>
          <CardTitle $iconColor="#28a745">
            <Trophy size={20} />
            Rendimiento General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>{totalWins}</MainValue>
            <MainUnit>/ {totalMatches} victorias</MainUnit>
          </MainStat>
          <ProgressBar>
            <ProgressFill $percentage={winRate} $color="#28a745" />
          </ProgressBar>
          <SubStats>
            <SubStat>
              <SubStatLabel>Tasa de victoria</SubStatLabel>
              <SubStatValue>{formatPercentage(winRate)}%</SubStatValue>
            </SubStat>
          </SubStats>
        </CardContent>
      </OverviewCard>

      {/* Juegos Este Mes */}
      <OverviewCard $accentColor="#6f42c1">
        <CardHeader>
          <CardTitle $iconColor="#6f42c1">
            <Star size={20} />
            Juegos Este Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MainStat>
            <MainValue>{monthlyUniqueGames}</MainValue>
            <MainUnit>juegos diferentes este mes</MainUnit>
          </MainStat>

          <SubStats>
            <SubStat>
              <SubStatLabel>{uniqueGamesTotal} juegos diferentes en total</SubStatLabel>
            </SubStat>
            {stats.mostPlayedGame?.game && (
              <GameCard>
                <GameImage
                  src={stats.mostPlayedGame.game.image || "/placeholder.svg?height=60&width=60&query=board game"}
                  alt={stats.mostPlayedGame.game.name}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=60&width=60"
                  }}
                />
                <GameInfo>
                  <GameName>{stats.mostPlayedGame.game.name}</GameName>
                  <GameCount>{stats.mostPlayedGame.count} partidas jugadas</GameCount>
                </GameInfo>
              </GameCard>
            )}
          </SubStats>
        </CardContent>
      </OverviewCard>

      {/* MEJORADO: Compañero Top */}
      <OverviewCard $accentColor="#fd7e14">
        <CardHeader>
          <CardTitle $iconColor="#fd7e14">
            <Users size={20} />
            Compañero Top
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasValidPartnerData() ? (
            <>
              <MainStat>
                <MainValue style={{ fontSize: "1.8rem" }}>{getPartnerDisplayName()}</MainValue>
                <MainUnit>es con quien más has jugado</MainUnit>
              </MainStat>

              <SubStats>
                <SubStat>
                  <SubStatLabel>Estimado: {totalPartners} personas diferentes han jugado contigo</SubStatLabel>
                </SubStat>

                <PartnerCard>
                  <PartnerInfo>
                    <PartnerName>Partidas juntos</PartnerName>
                    <PartnerCount>{stats.mostPlayedWithFriend.count} partidas</PartnerCount>
                  </PartnerInfo>
                </PartnerCard>
              </SubStats>
            </>
          ) : (
            <>
              <MainStat>
                <MainValue style={{ fontSize: "1.5rem" }}>
                  {totalMatches === 0
                    ? "Sin partidas aún"
                    : totalMatches < 2
                      ? "Necesitas más partidas"
                      : "Sin compañeros frecuentes"}
                </MainValue>
                <MainUnit>
                  {totalMatches === 0
                    ? "juega tu primera partida"
                    : totalMatches < 2
                      ? "juega más partidas multijugador"
                      : "juega más con los mismos compañeros"}
                </MainUnit>
              </MainStat>

              <SubStats>
                <SubStat>
                  <SubStatLabel>
                    🎮{" "}
                    {totalMatches === 0
                      ? "Registra partidas para ver estadísticas de compañeros"
                      : totalMatches < 2
                        ? "Necesitas al menos 2 partidas multijugador"
                        : "Juega más partidas con las mismas personas para ver estadísticas detalladas"}
                  </SubStatLabel>
                </SubStat>

                {totalPartners > 0 && (
                  <SubStat>
                    <SubStatLabel>Estimado: {totalPartners} personas diferentes han jugado contigo</SubStatLabel>
                  </SubStat>
                )}
              </SubStats>
            </>
          )}
        </CardContent>
      </OverviewCard>
    </OverviewContainer>
  )
}

export default StatsOverview
