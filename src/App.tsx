import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
  styled,
  Grid,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  IconButton,
  Fade,
} from "@mui/material";
import {
  Casino as CasinoIcon,
  Person,
  Psychology,
  Campaign,
  FitnessCenter,
  Info as InfoIcon,
  ContentCopy as CopyIcon,
  Inventory as InventoryIcon,
  MonetizationOn as GoldIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";
import { generateNPC } from "./utils/npcGenerator";
import { NPC, Item } from "./types/npc";
import { styled as muiStyled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: "#ffffff",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(2),
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const GenerateButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2, 6),
  fontSize: "1.1rem",
  borderRadius: theme.spacing(3),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
}));

const BackstoryPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: "#f8f9fa",
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
  fontStyle: "italic",
  position: "relative",
}));

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

const AttributeChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translateY(-2px)",
  },
}));

const StatsTable = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  "& .MuiTableCell-root": {
    padding: theme.spacing(1.5),
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
  },
}));

const StatCell = styled(TableCell)<{ value: number }>(({ theme, value }) => ({
  fontWeight: "bold",
  fontSize: "1.1rem",
  color:
    value >= 16
      ? theme.palette.success.main
      : value <= 8
      ? theme.palette.error.main
      : "inherit",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatBonus = ({ value }: { value: number }) => {
  const bonus = Math.floor((value - 10) / 2);
  return (
    <Typography
      variant="caption"
      display="block"
      color="text.secondary"
      sx={{
        fontWeight: 500,
        fontSize: "0.85rem",
      }}
    >
      {bonus >= 0 ? `+${bonus}` : bonus}
    </Typography>
  );
};

const NPCAttribute = ({
  label,
  value,
  important = false,
  tooltip = "",
}: {
  label: string;
  value: string | number | string[];
  important?: boolean;
  tooltip?: string;
}) => (
  <ListItem
    sx={{
      transition: "background-color 0.2s ease-in-out",
      borderRadius: 1,
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.02)",
      },
    }}
  >
    <ListItemText
      primary={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant={important ? "h6" : "subtitle2"}
            color={important ? "primary" : "textSecondary"}
            sx={{ fontWeight: important ? 500 : 400 }}
          >
            {label}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip} arrow>
              <InfoIcon fontSize="small" color="action" />
            </Tooltip>
          )}
        </Box>
      }
      secondary={
        Array.isArray(value) ? (
          <Box sx={{ mt: 1 }}>
            {value.map((item, index) => (
              <AttributeChip key={index} label={item} />
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {value}
          </Typography>
        )
      }
    />
  </ListItem>
);

const InventoryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(4px)",
  },
}));

const ItemQuantity = styled(Typography)(({ theme }) => ({
  minWidth: theme.spacing(4),
  textAlign: "center",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

const ItemType = styled(Chip)(({ theme }) => ({
  marginLeft: "auto",
  textTransform: "capitalize",
}));

const ItemList = ({ items }: { items: Item[] }) => {
  // Group items by type
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <>
      {Object.entries(groupedItems).map(([type, items]) => (
        <Box key={type} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ mb: 1, textTransform: "capitalize" }}
          >
            {type}s
          </Typography>
          {items.map((item, index) => (
            <InventoryItem key={index}>
              <ItemQuantity variant="body2">{item.quantity}×</ItemQuantity>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
                {item.description && (
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </Box>
              <ItemType size="small" label={item.type} variant="outlined" />
            </InventoryItem>
          ))}
        </Box>
      ))}
    </>
  );
};

const FactionChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  fontWeight: 500,
  "& .MuiChip-icon": {
    color: "inherit",
  },
}));

const FactionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateX(4px)",
    backgroundColor: theme.palette.grey[100],
  },
}));

const RelationshipChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.info.light,
  color: theme.palette.info.contrastText,
  fontWeight: 500,
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
        <Grid item xs={12}>
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
            <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12}>
              <NPCCard>
                <SectionTitle variant="h6">Background</SectionTitle>
                <Typography variant="body2" paragraph>
                  {npc.backstory}
                </Typography>
              </NPCCard>
            </Grid>

            {/* Reputation Effects */}
            <Grid item xs={12}>
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
