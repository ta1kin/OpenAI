import { prisma } from '../prisma';

export const checkBalance = async (userId: number): Promise<number> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  });

  if (!user) throw new Error('User not found');
  return user.balance;
};

export const updateBalance = async (userId: number, amount: number): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  });

  if (!user) throw new Error('User not found');

  await prisma.user.update({
    where: { id: userId },
    data: { balance: user.balance + amount },
  });
};
