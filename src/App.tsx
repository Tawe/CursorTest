import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  styled,
  Grid,
  Paper,
} from "@mui/material";
import { generateNPC } from "./utils/npcGenerator";
import { NPC } from "./types/npc";
import { styled as muiStyled } from "@mui/material/styles";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  fontWeight: 500,
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
  },
}));

// Styled components for the new design
const AppContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  maxHeight: "100vh",
  overflowY: "auto",
}));

const NPCCard = muiStyled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
}));

const StatBlock = muiStyled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(0.5),
}));

const ActionButton = muiStyled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  textTransform: "none",
  padding: theme.spacing(1, 3),
}));

function App() {
  const [npc, setNpc] = useState<NPC | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateNPC = () => {
    setNpc(generateNPC());
  };

  const handleCopyNPC = () => {
    if (!npc) return;
    const npcText = `
Name: ${npc.name}
Level ${npc.level} ${npc.race} ${npc.class}
Age: ${npc.age} years old
Occupation: ${npc.occupation}

${npc.backstory}

Basic Information:
- Background: ${npc.background}
- Alignment: ${npc.alignment}
- Sex: ${npc.sex}
- Deity: ${npc.deity}

Ability Scores:
STR: ${npc.abilityScores.strength} (${Math.floor(
      (npc.abilityScores.strength - 10) / 2
    )})
DEX: ${npc.abilityScores.dexterity} (${Math.floor(
      (npc.abilityScores.dexterity - 10) / 2
    )})
CON: ${npc.abilityScores.constitution} (${Math.floor(
      (npc.abilityScores.constitution - 10) / 2
    )})
INT: ${npc.abilityScores.intelligence} (${Math.floor(
      (npc.abilityScores.intelligence - 10) / 2
    )})
WIS: ${npc.abilityScores.wisdom} (${Math.floor(
      (npc.abilityScores.wisdom - 10) / 2
    )})
CHA: ${npc.abilityScores.charisma} (${Math.floor(
      (npc.abilityScores.charisma - 10) / 2
    )})

Unique Trait: ${npc.uniqueTrait}
Goals: ${npc.goals.join(", ")}
Roleplaying Hints: ${npc.roleplayingHints.join(", ")}

Reputation Effects:
Boon (Reputation ≥ ${npc.boon.requiredReputation}): ${npc.boon.name}
- ${npc.boon.description}

Bane (Reputation ≤ ${npc.bane.requiredNegativeReputation}): ${npc.bane.name}
- ${npc.bane.description}
    `.trim();

    navigator.clipboard.writeText(npcText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppContainer maxWidth="lg">
      <Grid container spacing={2}>
        {/* Header with actions */}
        <Grid item xs={12} margin="auto">
          <NPCCard>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Typography variant="h5" component="h1">
                  D&D NPC Generator
                </Typography>
              </Grid>
              <Grid item>
                <ActionButton
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateNPC}
                >
                  Generate NPC
                </ActionButton>
              </Grid>
              <Grid item>
                <ActionButton
                  variant="outlined"
                  color="primary"
                  onClick={handleCopyNPC}
                >
                  {copied ? "Copied!" : "Copy NPC"}
                </ActionButton>
              </Grid>
            </Grid>
          </NPCCard>
        </Grid>

        {npc && (
          <>
            {/* Basic Info Section */}
            <Grid item xs={12} md={6} height="100%" margin="auto">
              <NPCCard>
                <SectionTitle variant="h6">Basic Information</SectionTitle>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{npc.name}</Typography>
                    <Typography variant="subtitle1">
                      Level {npc.level} {npc.race} {npc.class}
                    </Typography>
                    {npc.faction && (
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {npc.faction.standing} of {npc.faction.name} •{" "}
                        {npc.faction.role}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Age: {npc.age}</Typography>
                    <Typography variant="body2">Sex: {npc.sex}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Alignment: {npc.alignment}
                    </Typography>
                    <Typography variant="body2">Deity: {npc.deity}</Typography>
                  </Grid>
                </Grid>
              </NPCCard>
            </Grid>

            {/* Contacts Card */}
            {npc.contacts.length > 0 && (
              <Grid item xs={12} md={6} margin="auto">
                <NPCCard>
                  <SectionTitle variant="h6">Notable Contacts</SectionTitle>
                  <Grid container spacing={2}>
                    {npc.contacts.map((contact, index) => (
                      <Grid item xs={12} key={index}>
                        <Box
                          sx={{
                            p: 1.5,
                            bgcolor: "background.default",
                            borderRadius: 1,
                            mb: index !== npc.contacts.length - 1 ? 1 : 0,
                          }}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            {contact.name}
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {contact.faction}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {contact.role}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "primary.main",
                                  fontWeight: 500,
                                }}
                              >
                                {contact.relationship}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </NPCCard>
              </Grid>
            )}

            {/* Stats Section */}
            <Grid item xs={12} md={6} margin="auto">
              <NPCCard>
                <SectionTitle variant="h6">Ability Scores</SectionTitle>
                <Grid container spacing={1}>
                  {Object.entries(npc.abilityScores).map(([ability, score]) => (
                    <Grid item xs={4} key={ability}>
                      <StatBlock>
                        <Typography variant="subtitle2">
                          {ability.toUpperCase()}
                        </Typography>
                        <Typography variant="h6">{score}</Typography>
                        <Typography variant="caption">
                          ({Math.floor((score - 10) / 2)})
                        </Typography>
                      </StatBlock>
                    </Grid>
                  ))}
                </Grid>
              </NPCCard>
            </Grid>

            {/* Personality Section */}
            <Grid item xs={12} md={6} margin="auto">
              <NPCCard>
                <SectionTitle variant="h6">Personality</SectionTitle>
                <Typography variant="subtitle2" gutterBottom>
                  Unique Trait
                </Typography>
                <Typography variant="body2" paragraph>
                  {npc.uniqueTrait}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Goals
                </Typography>
                <Typography variant="body2" paragraph>
                  {npc.goals.join(", ")}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Roleplaying Hints
                </Typography>
                <Typography variant="body2">
                  {npc.roleplayingHints.join(", ")}
                </Typography>
              </NPCCard>
            </Grid>

            {/* Background Section */}
            <Grid item xs={12} margin="auto">
              <NPCCard>
                <SectionTitle variant="h6">Background</SectionTitle>
                <Typography variant="body2" paragraph>
                  {npc.backstory}
                </Typography>
              </NPCCard>
            </Grid>

            {/* Reputation Effects */}
            <Grid item xs={12} margin="auto">
              <NPCCard>
                <SectionTitle variant="h6">Reputation Effects</SectionTitle>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" color="primary">
                      Boon (Reputation ≥ {npc.boon.requiredReputation})
                    </Typography>
                    <Typography variant="body1">{npc.boon.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {npc.boon.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" color="error">
                      Bane (Reputation ≤ {npc.bane.requiredNegativeReputation})
                    </Typography>
                    <Typography variant="body1">{npc.bane.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {npc.bane.description}
                    </Typography>
                  </Grid>
                </Grid>
              </NPCCard>
            </Grid>
          </>
        )}
      </Grid>
    </AppContainer>
  );
}

export default App;
